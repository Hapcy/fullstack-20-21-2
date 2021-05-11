import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { IssueService } from '../core/issue.service';
import { Issue } from '../domain/issue';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss'],
})
export class IssueDetailsComponent implements OnInit {
  issue?: Issue;

  message: FormControl = this.fb.control('', Validators.required);

  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  constructor(
    private issueService: IssueService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const issueId = parseInt(
      this.route.snapshot.paramMap.get('issueId') as string
    );
    this.issue = await this.issueService.getIssue(issueId);
  }

  async addMessage(): Promise<void> {
    if (this.message.invalid) {
      return;
    }
    const createdMessage = await this.issueService.addMessage(
      this.issue as Issue,
      this.message.value
    );
    (this.issue as Issue).messages.push(createdMessage);
    this.message.reset('');
  }

  async deleteIssue(): Promise<void> {
    await this.issueService.deleteIssue(this.issue as Issue);
    this.router.navigate(['/', 'issues']);
  }
}
