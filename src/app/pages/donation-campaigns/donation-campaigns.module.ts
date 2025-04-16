// src/app/pages/donation-campaigns/donation-campaigns.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationCampaignsRoutingModule } from './donation-campaigns-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DonationCampaignsComponent } from './donation-campaigns.component';
import { CampaignDetailComponent } from './campaign-detail.component';
import { CampaignFormComponent } from './campaign-form.component';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DonationCampaignsRoutingModule,
    DonationCampaignsComponent,
    CampaignDetailComponent,
    CampaignFormComponent
  ]
})
export class DonationCampaignsModule {}
