import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface LearningModule {
  topic: string;
  issueType: string;
  definition: string;
  whyItMatters: string;
  steps: string[];
  badExample: string;
  goodExample: string;
  checklist: string[];
  relatedTopics: string[];
}

export interface AiSuggestion {
  issueType: string;
  suggestedFix: string;
  explanation: string;
  risks: string[];
  confidence: number;
}

@Injectable({ providedIn: 'root' })
export class AscendGuidanceService {
  constructor(private http: HttpClient) {}

  getLearningModule(topic: string, issueType: string): Observable<LearningModule | null> {
    return this.http.get<LearningModule[]>('/assets/mock/reviews/learning.json').pipe(
      map(list => list.find(x =>
        x.topic.toLowerCase() === topic.toLowerCase() && x.issueType === issueType
      ) ?? null)
    );
  }

  getAiSuggestion(issueType: string): Observable<AiSuggestion | null> {
    return this.http.get<AiSuggestion[]>('/assets/mock/reviews/suggestion.json').pipe(
      map(list => list.find(x => x.issueType === issueType) ?? null)
    );
  }
}
