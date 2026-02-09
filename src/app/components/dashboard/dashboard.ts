
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReviewService } from '../../services/review-service/review-service';
import { CodeReview, FindingType, ReviewStatus, Severity } from '../../model/code-review';

/**
 * Dashboard component displaying all code reviews.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  reviews: CodeReview[] = [];
  loading = true;
  error: string | null = null;
  
  // Expose enums to template
  readonly ReviewStatus = ReviewStatus;
  readonly FindingType = FindingType;
  readonly Severity = Severity;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  /**
   * Load all reviews from API.
   */
  loadReviews(): void {
    this.loading = true;
    this.error = null;

    this.reviewService.getAllReviews().subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load reviews: ' + err.message;
        this.loading = false;
      }
    });
  }

  /**
   * Get count of findings by type.
   */
  getCount(review: CodeReview, type: FindingType): number {
    return review.findings?.filter(f => f.type === type).length || 0;
  }

  /**
   * Get total findings count.
   */
  getTotalFindings(review: CodeReview): number {
    return review.findings?.length || 0;
  }

  /**
   * Get badge class for review status.
   */
  getStatusBadgeClass(status: ReviewStatus): string {
    switch (status) {
      case ReviewStatus.COMPLETED: return 'bg-success';
      case ReviewStatus.PROCESSING: return 'bg-warning';
      case ReviewStatus.PENDING: return 'bg-info';
      case ReviewStatus.FAILED: return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  /**
   * Get critical/high severity count.
   */
  getCriticalCount(review: CodeReview): number {
    return review.findings?.filter(f => 
      f.severity === Severity.CRITICAL || f.severity === Severity.HIGH
    ).length || 0;
  }

  /**
   * Format timestamp to readable string.
   */
  formatDate(timestamp: string): string {
    return new Date(timestamp).toLocaleString();
  }
}