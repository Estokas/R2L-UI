import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CodeReview } from '../model/code-review';

@Injectable({
  providedIn: 'root'
})
export class CodeReviewService {
  private apiUrl = 'http://localhost:8080/api'; // ✅ Must include /api

  constructor(private http: HttpClient) { }

  getAllReviews(): Observable<CodeReview[]> {
    return this.http.get<CodeReview[]>(`${this.apiUrl}/reviews`);
  }

  getReviewByCommitSha(commitSha: string): Observable<CodeReview> {
    return this.http.get<CodeReview>(`${this.apiUrl}/reviews/${commitSha}`);
  }
}

