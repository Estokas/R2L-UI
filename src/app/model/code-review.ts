export interface CodeReview {
  id: number;
  commitSha: string;
  repositoryName: string;
  author: string;
  commitMessage: string;
  commitTimestamp: string;
  reviewTimestamp: string;
  status: ReviewStatus;
  findings: ReviewFinding[];
  errorMessage?: string;
}

export interface ReviewFinding {
  id: number;
  type: FindingType;
  fileName: string;
  lineNumber: number;
  severity: Severity;
  description: string;
  suggestion?: string;
}

export enum ReviewStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export enum FindingType {
  BUGS = 'BUGS',
  SECURITY = 'SECURITY',
  PERFORMANCE = 'PERFORMANCE',
  STYLE = 'STYLE',
  REFACTOR = 'REFACTOR'
}

export enum Severity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  INFO = 'INFO'
}