import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeReviewService } from '../../services/code-review';
import { CodeReview } from '../../model/code-review';
import { FindingsCardComponent } from '../findings-card/findings-card';
import { AscendGuidanceService, LearningModule, AiSuggestion } from '../../services/ascend.service';

@Component({
  selector: 'app-review-detail',
  standalone: true,
  imports: [CommonModule, FindingsCardComponent],
  templateUrl: './review-detail-component.html',
  styleUrls: ['./review-detail-component.css']
})
export class ReviewDetailComponent implements OnInit {
  review: CodeReview | null = null;
  loading = true;
  error: string | null = null;

  aiEnabled = false;
  selectedFinding: any | null = null;
  showLearningModal = false;

  selectedTopic: 'Java' | 'Angular' | 'SQL' = 'Java';
  learningModule: LearningModule | null = null;
  aiSuggestion: AiSuggestion | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private codeReviewService: CodeReviewService,
    private guidance: AscendGuidanceService
  ) {}

  ngOnInit(): void {
    const commitSha = this.route.snapshot.paramMap.get('commitSha');
    if (commitSha) this.loadReview(commitSha);
    console.error('ReviewDetailComponent initialized with commitSha:', commitSha);
  }

  loadReview(commitSha: string): void {
    console.error('Loading review for commit:', commitSha);
    console.error('Loading review for commit:', commitSha);
    // Try to load real data from API first
    this.codeReviewService.getReviewByCommitSha(commitSha).subscribe({
      next: (data) => {
        // Enhance real data with issueType for learning module support
        const enrichedReview: CodeReview = {
          ...data,
          findings: data.findings.map((f: any) => ({
            ...f,
            // Map finding type to issueType if not present
            issueType: f.issueType || this.mapTypeToIssueType(f.type)
          }))
        };
        console.log('Loaded review data:', enrichedReview);
        this.review = enrichedReview;
        this.loading = false;
      },
      error: (err) => {
        // Fall back to mock data if API fails
        console.warn('Failed to load real review data, using mock data:', err);
        this.loadMockReview(commitSha);
      }
    });
  }

  private loadMockReview(commitSha: string): void {
    // Create mock findings with issueType that matches learning modules
    console.log(commitSha);
    console.log(commitSha);
    console.log(commitSha)
    
    const mockReview: CodeReview = {
      id: 1,
      commitSha: commitSha,
      repositoryName: 'Sample Repository',
      author: 'John Developer',
      commitMessage: 'Fix null pointer exception',
      commitTimestamp: new Date().toISOString(),
      reviewTimestamp: new Date().toISOString(),
      status: 'COMPLETED' as any,
      findings: [
        {
          id: 1,
          type: 'BUGS' as any,
          fileName: 'UserService.java',
          lineNumber: 42,
          severity: 'CRITICAL' as any,
          description: 'Null pointer exception when accessing user object',
          suggestion: 'Add null check before accessing properties',
          issueType: 'NULL_CHECK_MISSING'
        },
        {
          id: 2,
          type: 'SECURITY' as any,
          fileName: 'QueryBuilder.java',
          lineNumber: 127,
          severity: 'HIGH' as any,
          description: 'SQL concatenation detected - potential injection vulnerability',
          suggestion: 'Use prepared statements instead',
          issueType: 'SQL_INJECTION_RISK'
        }
      ]
    };
    
    this.review = mockReview;
    this.loading = false;
  }

  private mapTypeToIssueType(type: string): string {
    // Map code review finding types to learning module issue types
    const typeMap: { [key: string]: string } = {
      'BUGS': 'NULL_CHECK_MISSING',
      'SECURITY': 'SQL_INJECTION_RISK',
      'PERFORMANCE': 'PERFORMANCE_ISSUE',
      'STYLE': 'STYLE_VIOLATION',
      'REFACTOR': 'REFACTOR_NEEDED'
    };
    return typeMap[type] || type;
  }

  onSelectFinding(finding: any) {
    this.selectedFinding = finding;
    this.showLearningModal = true;

    // Detect topic based on issueType
    const issueType = (finding?.issueType || '').toUpperCase();
    if (issueType.includes('SQL') || issueType.includes('INJECTION')) {
      this.selectedTopic = 'SQL';
    } else if (issueType.includes('NULL') || issueType.includes('CHECK')) {
      this.selectedTopic = 'Java';
    } else if (finding?.language?.toLowerCase().includes('angular') || 
               finding?.language?.toLowerCase().includes('ts') || 
               finding?.language?.toLowerCase().includes('js')) {
      this.selectedTopic = 'Angular';
    }

    this.loadPanels();
  }

  closeLearningModal() {
    this.showLearningModal = false;
    this.selectedFinding = null;
  }

  toggleAi(enabled: boolean) {
    this.aiEnabled = enabled;
    this.loadPanels();
  }

  private loadPanels() {
    if (!this.selectedFinding) return;

    const issueType = this.selectedFinding.issueType;
    const topic = this.selectedTopic;

    this.guidance.getLearningModule(topic, issueType).subscribe(m => this.learningModule = m);

    if (this.aiEnabled) {
      this.guidance.getAiSuggestion(issueType).subscribe(s => this.aiSuggestion = s);
    } else {
      this.aiSuggestion = null;
    }
  }

  get confidencePct(): string {
    return this.aiSuggestion ? `${Math.round(this.aiSuggestion.confidence * 100)}%` : '';
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  get reviewStatusClass(): string {
    if (!this.review?.status) return 'status-unknown';
    return `status-${this.review.status.toLowerCase()}`;
  }

  get criticalFindingsCount(): number {
    if (!this.review?.findings) return 0;
    return this.review.findings.filter(f => 
      f.severity === 'CRITICAL' || f.severity === 'HIGH'
    ).length;
  }
}
