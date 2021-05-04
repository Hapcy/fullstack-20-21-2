import { Injectable } from '@angular/core';
import { Issue } from '../domain/issue';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private issues: Issue[] = [];

  constructor() {}

  getIssues(): Issue[] {
    return this.issues;
  }

  getIssue(issueId: number): Issue {
    return this.issues.find((issue) => issue.id === issueId) as Issue;
  }

  createIssue(issue: Issue): void {
    this.issues.push(issue);
  }

  editIssue(issueToEdit: Issue, value: Issue): void {
    this.issues.splice(this.issues.indexOf(issueToEdit), 1, {
      ...issueToEdit,
      ...value,
    });
  }
}
