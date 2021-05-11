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
  issues!: Promise<Issue[]>;

  constructor(private issueService: IssueService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getIssues();
  }

  async startCreateIssue(): Promise<void> {
    const dialogRef = this.dialog.open(IssueEditorComponent, {
      height: '400px',
    });

    await dialogRef.afterClosed().toPromise();

    this.getIssues();
  }

  async startEditIssue(issue: Issue): Promise<void> {
    const dialogRef = this.dialog.open(IssueEditorComponent, {
      height: '400px',
      data: issue,
    });

    await dialogRef.afterClosed().toPromise();

    this.getIssues();
  }

  private getIssues(): void {
    this.issues = this.issueService.getIssues();
  }
}
