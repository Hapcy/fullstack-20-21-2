import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from '../core/issue.service';
import { Issue } from '../domain/issue';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss'],
})
export class IssueDetailsComponent implements OnInit {
  issue: Issue;

  constructor(
    private issueService: IssueService,
    private route: ActivatedRoute
  ) {
    const issueId = parseInt(
      this.route.snapshot.paramMap.get('issueId') as string
    );
    this.issue = this.issueService.getIssue(issueId);
  }

  ngOnInit(): void {}
}
