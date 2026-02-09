import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewFinding } from '../../model/code-review';

@Component({
  selector: 'app-findings-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './findings-card.html',
  styleUrls: ['./findings-card.css']
})
export class FindingsCardComponent {
  @Input() finding!: ReviewFinding;

  getTypeIcon(type: string): string {
    const icons: any = {
      'BUGS': '🐛',
      'SECURITY': '🔒',
      'PERFORMANCE': '⚡',
      'STYLE': '🎨',
      'REFACTOR': '🔧'
    };
    return icons[type] || '📝';
  }

  getSeverityClass(severity: string): string {
    return `severity-${severity.toLowerCase()}`;
  }

  getTypeClass(type: string): string {
    return `type-${type.toLowerCase()}`;
  }
}