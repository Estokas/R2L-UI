import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeReviewService } from '../../services/code-review';
import { CodeReview } from '../../model/code-review';
import { FindingsCardComponent } from '../findings-card/findings-card'; // ✅ Import

@Component({
  selector: 'app-review-detail',
  standalone: true,
  imports: [CommonModule, FindingsCardComponent], // ✅ Add to imports
  templateUrl: './review-detail-component.html',
  styleUrls: ['./review-detail-component.css']
})
export class ReviewDetailComponent implements OnInit {
  review: CodeReview | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private codeReviewService: CodeReviewService
  ) { }

  ngOnInit(): void {
    const commitSha = this.route.snapshot.paramMap.get('commitSha');
    if (commitSha) {
      this.loadReview(commitSha);
    }
  }

  loadReview(commitSha: string): void {
    this.codeReviewService.getReviewByCommitSha(commitSha).subscribe({
      next: (data) => {
        this.review = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = `Failed to load review: ${err.message}`;
        this.loading = false;
        console.error('Error loading review:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  

  getStatusClass(status: string | undefined | null): string {
    if (!status) {
      return 'status-unknown';
    }
    return `status-${status.toLowerCase()}`;
  }
}