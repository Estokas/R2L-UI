import { Component, Input, OnChanges } from '@angular/core';
import { CodeReview } from '../../model/code-review';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.html',
  styleUrls: ['./statistics.css']
})
export class StatisticsComponent implements OnChanges {
  @Input() reviews: CodeReview[] = [];

  totalReviews = 0;
  completedReviews = 0;
  totalFindings = 0;
  criticalFindings = 0;

  ngOnChanges(): void {
    this.calculateStats();
  }

  calculateStats(): void {
    this.totalReviews = this.reviews.length;
    this.completedReviews = this.reviews.filter(r => r.status === 'COMPLETED').length;
    this.totalFindings = this.reviews.reduce((sum, r) => sum + r.findings.length, 0);
    this.criticalFindings = this.reviews.reduce((sum, r) => 
      sum + r.findings.filter(f => f.severity === 'CRITICAL').length, 0
    );
  }
}