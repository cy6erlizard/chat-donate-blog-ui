// src/app/pages/dashboard/dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MyCampaignsComponent } from './my-campaigns.component';
import { MyBlogsComponent } from './my-blogs.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'campaigns', component: MyCampaignsComponent },
      { path: 'blogs', component: MyBlogsComponent },
      { path: '', redirectTo: 'campaigns', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
