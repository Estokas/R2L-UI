import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewListComponent } from './components/review-list/review-list';
import { ReviewDetailComponent } from './components/review-detail-component/review-detail-component';

export const routes: Routes = [
  { path: '', component: ReviewListComponent },
  { path: 'review/:commitSha', component: ReviewDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }