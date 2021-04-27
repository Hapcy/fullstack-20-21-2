import { Injectable } from '@angular/core';
import { Issue } from './domain/issue';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private issues: Issue[] = [
    {
      title: 'Rossz projektor',
      description: 'Nem kapcsol be',
    },
    {
      title: 'Rossz számítógép',
      description: 'Lorem ipsum dolor sit amet',
    },
  ];

  constructor() {}

  getIssues(): Issue[] {
    return this.issues;
  }

  createIssue(issue: Issue): void {
    this.issues.push(issue);
  }
}
