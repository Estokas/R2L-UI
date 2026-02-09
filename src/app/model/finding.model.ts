export interface CodeReview {
  id: number;
  commitSha: string;
  repositoryName: string;
  author: string;
  commitMessage: string;
  commitTimestamp: string;
  reviewTimestamp: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  findings: ReviewFinding[];
  errorMessage?: string;
}

export interface ReviewFinding {
  id: number;
  type: 'BUGS' | 'SECURITY' | 'PERFORMANCE' | 'STYLE' | 'REFACTOR';
  fileName: string;
  lineNumber: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  description: string;
  suggestion: string;
}