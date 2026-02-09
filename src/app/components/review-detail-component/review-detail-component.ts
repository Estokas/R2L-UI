import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReviewService } from '../../services/review-service/review-service';
import { CodeReview, FindingType, ReviewFinding, Severity } from '../../model/code-review';

/**
 * Component displaying detailed view of a single code review.
 */
@Component({
  selector: 'app-review-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './review-detail-component.html',
  styleUrl: './review-detail-component.css'
})
export class ReviewDetailComponent implements OnInit {
  review: CodeReview | null = null;
  loading = true;
  error: string | null = null;
  
  // Group findings by type
  findingsByType = new Map<FindingType, ReviewFinding[]>();
  
  // Expose enums
  readonly FindingType = FindingType;
  readonly Severity = Severity;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const commitSha = this.route.snapshot.paramMap.get('commitSha');
    if (commitSha) {
      this.loadReview(commitSha);
    }
  }

  /**
   * Load review details from API.
   */
  loadReview(commitSha: string): void {
    this.loading = true;
    this.error = null;

    this.reviewService.getReviewByCommitSha(commitSha).subscribe({
      next: (review) => {
        this.review = review;
        this.groupFindings(review.findings);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load review: ' + err.message;
        this.loading = false;
      }
    });
  }

  /**
   * Group findings by their type.
   */
  groupFindings(findings: ReviewFinding[]): void {
    this.findingsByType.clear();
    
    Object.values(FindingType).forEach(type => {
      const filtered = findings.filter(f => f.type === type);
      if (filtered.length > 0) {
        this.findingsByType.set(type, filtered);
      }
    });
  }

  /**
   * Get badge class for severity.
   */
  getSeverityBadgeClass(severity: Severity): string {
    switch (severity) {
      case Severity.CRITICAL: return 'bg-danger';
      case Severity.HIGH: return 'bg-warning text-dark';
      case Severity.MEDIUM: return 'bg-info text-dark';
      case Severity.LOW: return 'bg-secondary';
      case Severity.INFO: return 'bg-light text-dark';
      default: return 'bg-secondary';
    }
  }

  /**
   * Get icon for finding type.
   */
  getTypeIcon(type: FindingType): string {
    switch (type) {
      case FindingType.BUGS: return 'bug';
      case FindingType.SECURITY: return 'shield-exclamation';
      case FindingType.PERFORMANCE: return 'speedometer2';
      case FindingType.STYLE: return 'palette';
      case FindingType.REFACTOR: return 'tools';
      default: return 'info-circle';
    }
  }

  /**
   * Get panel class for finding type.
   */
  getTypePanelClass(type: FindingType): string {
    switch (type) {
      case FindingType.BUGS: return 'border-danger';
      case FindingType.SECURITY: return 'border-warning';
      case FindingType.PERFORMANCE: return 'border-info';
      case FindingType.STYLE: return 'border-secondary';
      case FindingType.REFACTOR: return 'border-primary';
      default: return 'border-secondary';
    }
  }

  /**
   * Format timestamp.
   */
  formatDate(timestamp: string): string {
    return new Date(timestamp).toLocaleString();
  }

  /**
   * Get finding type entries for iteration.
   */
  getFindingTypeEntries(): [FindingType, ReviewFinding[]][] {
    return Array.from(this.findingsByType.entries());
  }
}