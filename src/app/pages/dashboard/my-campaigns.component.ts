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

  constructor(private svc: CampaignService, private router: Router) { }

  ngOnInit(): void {
    this.svc.getAll().subscribe(list => {
      // filter by current user if needed, or use a dedicated endpoint
      this.campaigns = list.filter(c => /* c.creatorId === currentUserId */ true);
    });
  }
  public navigateToNewCampaign() {
    this.router.navigate(['dashboard/campaigns/new']);
  }
  public navigateToEditCampaign(campaignId: string) {
    this.router.navigate(['dashboard/campaigns', campaignId, 'edit']);
  }

  delete(c: Campaign) {
    if (!confirm('Delete this campaign?')) return;
    this.svc.delete(c.id).subscribe(() => this.campaigns = this.campaigns.filter(x => x.id !== c.id));
  }
}
