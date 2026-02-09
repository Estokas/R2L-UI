import { Routes } from '@angular/router';
import { ReviewDetailComponent } from './components/review-detail-component/review-detail-component';
import { DashboardComponent } from './components/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'review/:commitSha', component: ReviewDetailComponent },
  { path: '**', redirectTo: '' }
];