import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { MainComponent } from './pages/main/main.component';

/**
 * TODO: when you’re ready, replace
 *   import { DonationCampaignsComponent } from './pages/donation-campaigns/...';
 *   import { BlogComponent } from './pages/blog/...';
 * with your actual implementations.
 */

export const routes: Routes = [
  // root landing + navbar
  {
    path: '',
    component: LandingComponent
  },
  // placeholder routes for when you implement these pages:
  {
    path: 'donation-campaigns',
    loadComponent: () => import('./pages/donation-campaigns/donation-campaigns.component')
      .then(m => m.DonationCampaignsComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog.component')
      .then(m => m.BlogComponent)
  },
  // your existing chat page
  {
    path: 'chat',
    component: MainComponent
  },
  // fallback
  {
    path: '**',
    redirectTo: ''
  }
];
