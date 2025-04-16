// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { MainComponent } from './pages/main/main.component';
import { AuthGuard } from './utils/keycloak/auth.guard';  // assume you have one

export const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'campaigns',
    loadChildren: () =>
      import('./pages/donation-campaigns/donation-campaigns.module')
        .then(m => m.DonationCampaignsModule)
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./pages/blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  { path: 'chat', component: MainComponent },
  { path: '**', redirectTo: '' }
];
