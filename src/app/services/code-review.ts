import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReviewFinding } from '../model/code-review';
import { environment } from '../environment/environment';
import { CodeReview } from '../model/code-review';

@Injectable({
  providedIn: 'root'
})
export class CodeReviewService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllReviews(): Observable<CodeReview[]> {
    return this.http.get<CodeReview[]>(`${this.apiUrl}/api/reviews`);
  }

  getReviewByCommitSha(commitSha: string): Observable<CodeReview> {
    return this.http.get<CodeReview>(`${this.apiUrl}/api/reviews/${commitSha}`);
  }
}