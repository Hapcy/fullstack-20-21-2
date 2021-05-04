import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IssueService } from '../core/issue.service';
import { Issue } from '../domain/issue';
import { IssueEditorComponent } from '../issue-editor/issue-editor.component';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  issues!: Issue[];

  constructor(
    private issueService: IssueService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.issues = this.issueService.getIssues();
  }

  startCreateIssue(): void {
    this.dialog.open(IssueEditorComponent, {
      height: '400px',
    });
  }

  startEditIssue(issue: Issue): void {
    this.dialog.open(IssueEditorComponent, {
      height: '400px',
      data: issue,
    });
  }
}
