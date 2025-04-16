// src/app/pages/donation-campaigns/campaign-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignService } from '../../services/services/campaign.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-detail.component.scss']
})
export class CampaignFormComponent implements OnInit {
  form!: FormGroup;
  saving = false;
  editing = false;
  campaignId?: string;
  errorMsg?: string;

  constructor(
    private fb: FormBuilder,
    private svc: CampaignService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      goal: [null, [Validators.required, Validators.min(1)]],
      imageUrl: ['']
    });

    this.campaignId = this.route.snapshot.paramMap.get('id')!;
    if (this.campaignId) {
      this.editing = true;
      this.svc.getById(this.campaignId).subscribe(c => this.form.patchValue(c));
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.saving = true;
    const obs = this.editing
      ? this.svc.update(this.campaignId!, this.form.value)
      : this.svc.create(this.form.value);

    obs.subscribe({
      next: () => this.router.navigate(['/dashboard/campaigns']),
      error: () => {
        this.errorMsg = 'Failed to save campaign.';
        this.saving = false;
      }
    });
  }
}
