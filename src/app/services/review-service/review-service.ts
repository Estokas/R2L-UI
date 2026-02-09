import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CodeReview } from '../../model/code-review';
import { environment } from '../../environment/environment';

/**
 * Service for interacting with the Code Review API.
 */
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly apiUrl = `${environment.apiBaseUrl}/reviews`;
  private readonly headers = new HttpHeaders({
    'Authorization': `token ${environment.githubToken}`
  });

  constructor(private http: HttpClient) {}

  /**
   * Fetch all code reviews.
   */
  getAllReviews(): Observable<CodeReview[]> {
    return this.http.get<CodeReview[]>(this.apiUrl, { headers: this.headers });
  }

  /**
   * Fetch a specific review by commit SHA.
   */
  getReviewByCommitSha(commitSha: string): Observable<CodeReview> {
    return this.http.get<CodeReview>(`${this.apiUrl}/${commitSha}`, { headers: this.headers });
  }

  /**
   * Fetch reviews for a specific repository.
   */
  getReviewsByRepository(repositoryName: string): Observable<CodeReview[]> {
    return this.http.get<CodeReview[]>(`${this.apiUrl}/repository/${repositoryName}`, { headers: this.headers });
  }
}