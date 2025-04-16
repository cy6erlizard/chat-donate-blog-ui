// src/app/pages/donation-campaigns/donation-campaigns.component.ts
import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/services/campaign.service';
import { Campaign } from '../../services/models/campaign.model';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-donation-campaigns',
  templateUrl: './donation-campaigns.component.html',
  styleUrls: ['./donation-campaigns.component.scss'],
  imports: [RouterModule ],
})
export class DonationCampaignsComponent implements OnInit {
  campaigns: Campaign[] = [];

  constructor(private svc: CampaignService) {}

  ngOnInit() {
    this.svc.getAll().subscribe(list => this.campaigns = list);
  }
}
