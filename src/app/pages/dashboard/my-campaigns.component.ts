// src/app/pages/dashboard/my-campaigns.component.ts
import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/services/campaign.service';
import { Campaign } from '../../services/models/campaign.model';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-my-campaigns',
  templateUrl: './my-campaigns.component.html',
  imports: [CurrencyPipe],
})
export class MyCampaignsComponent implements OnInit {
  campaigns: Campaign[] = [];

  constructor(private svc: CampaignService, private router: Router) {}

  ngOnInit() {
    this.svc.getMine().subscribe(list => this.campaigns = list);
  }

  navigateToNewCampaign() {
    this.router.navigate(['dashboard/campaigns/new']);
  }

  navigateToEditCampaign(id: string) {
    this.router.navigate(['dashboard/campaigns', id, 'edit']);
  }

  delete(c: Campaign) {
    if (!confirm('Delete this campaign?')) return;
    this.svc.delete(c.id).subscribe(() =>
      this.campaigns = this.campaigns.filter(x => x.id !== c.id)
    );
  }
}
