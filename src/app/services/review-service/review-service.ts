import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  /**
   * Fetch all code reviews.
   */
  getAllReviews(): Observable<CodeReview[]> {
    return this.http.get<CodeReview[]>(this.apiUrl);
  }

  /**
   * Fetch a specific review by commit SHA.
   */
  getReviewByCommitSha(commitSha: string): Observable<CodeReview> {
    return this.http.get<CodeReview>(`${this.apiUrl}/${commitSha}`);
  }

  /**
   * Fetch reviews for a specific repository.
   */
  getReviewsByRepository(repositoryName: string): Observable<CodeReview[]> {
    return this.http.get<CodeReview[]>(`${this.apiUrl}/repository/${repositoryName}`);
  }
}