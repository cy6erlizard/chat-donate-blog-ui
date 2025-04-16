// src/app/pages/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MyCampaignsComponent } from './my-campaigns.component';
import { MyBlogsComponent } from './my-blogs.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    DashboardComponent,
    MyCampaignsComponent,
    MyBlogsComponent  ]
})
export class DashboardModule {}
