import { Component, OnInit } from '@angular/core';
import { Issue } from '../domain/issue';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  issues!: Issue[];

  constructor(
    private issueService: IssueService,
  ) {}

  ngOnInit(): void {
    this.issues = this.issueService.getIssues();
  }
}
