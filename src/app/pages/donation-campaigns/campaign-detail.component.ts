// src/app/pages/donation-campaigns/campaign-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from '../../services/services/campaign.service';
import { PaymentService } from '../../services/services/payment.service';
import { Campaign } from '../../services/models/campaign.model';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss'],
  imports: [ReactiveFormsModule,
    CommonModule
  ]
})
export class CampaignDetailComponent implements OnInit {
  campaign!: Campaign;
  donationForm!: FormGroup;
  processing = false;
  errorMsg?: string;

  private stripePromise = loadStripe(environment.stripePublicKey);
  private cardElement!: StripeCardElement;
  private stripe!: Stripe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private campaignSvc: CampaignService,
    private paymentSvc: PaymentService,
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.campaignSvc.getById(id).subscribe(c => this.campaign = c);

    this.donationForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      donorName: ['', Validators.required],
      donorEmail: ['', [Validators.required, Validators.email]]
    });

    this.stripe = (await this.stripePromise)!;
    const elements = this.stripe.elements();
    this.cardElement = elements.create('card', { style: { base: { fontSize: '16px' } } });
    this.cardElement.mount('#card-element');
  }

  async onDonate() {
    if (this.donationForm.invalid) return;
    this.processing = true;
    this.errorMsg = undefined;

    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
      billing_details: {
        name: this.donationForm.value.donorName,
        email: this.donationForm.value.donorEmail
      }
    });

    if (error) {
      this.errorMsg = error.message;
      this.processing = false;
      return;
    }

    this.paymentSvc.process({
      campaignId: this.campaign.id,
      amount: this.donationForm.value.amount,
      donorName: this.donationForm.value.donorName,
      donorEmail: this.donationForm.value.donorEmail,
      paymentMethodId: paymentMethod!.id
    }).subscribe({
      next: () => this.router.navigate(['/campaigns', this.campaign.id], { queryParams: { donated: true } }),
      error: () => {
        this.errorMsg = 'Payment failed. Please try again.';
        this.processing = false;
      }
    });
  }
}
