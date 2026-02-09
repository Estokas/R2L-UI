import { Component, OnInit } from '@angular/core';
import { CodeReviewService } from '../../services/code-review';
import { CodeReview } from '../../model/code-review';
import { Router } from '@angular/router';
import { StatisticsComponent } from "../statistics/statistics";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.html',
  styleUrls: ['./review-list.css'],
  imports: [StatisticsComponent, CommonModule]
})
export class ReviewListComponent implements OnInit {
  reviews: CodeReview[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private codeReviewService: CodeReviewService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadReviews();
    // Auto-refresh every 30 seconds
    setInterval(() => this.loadReviews(), 30000);
  }

  loadReviews(): void {
    this.codeReviewService.getAllReviews().subscribe({
      next: (data) => {
        this.reviews = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load reviews';
        this.loading = false;
        console.error(err);
      }
    });
  }

  viewDetails(commitSha: string): void {
    this.router.navigate(['/review', commitSha]);
  }

  getStatusClass(status: string): string {
    const classes: any = {
      'COMPLETED': 'status-completed',
      'PROCESSING': 'status-processing',
      'PENDING': 'status-pending',
      'FAILED': 'status-failed'
    };
    return classes[status] || '';
  }

  getSeverityCount(review: CodeReview, severity: string): number {
    return review.findings.filter(f => f.severity === severity).length;
  }

  getTotalFindings(review: CodeReview): number {
    return review.findings.length;
  }
}