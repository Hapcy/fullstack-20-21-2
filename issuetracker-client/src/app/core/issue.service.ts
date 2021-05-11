import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Issue } from '../domain/issue';
import { Message } from '../domain/message';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  constructor(private httpClient: HttpClient) {}

  async getIssues(): Promise<Issue[]> {
    return (await this.httpClient.get('/api/issues').toPromise()) as Issue[];
  }

  async getIssue(issueId: number): Promise<Issue> {
    return (await this.httpClient
      .get(`/api/issues/${issueId}`)
      .toPromise()) as Issue;
  }

  async createIssue(issue: Issue): Promise<Issue> {
    return (await this.httpClient
      .post('/api/issues', issue)
      .toPromise()) as Issue;
  }

  async editIssue(issueToEdit: Issue, value: Issue): Promise<Issue> {
    return (await this.httpClient
      .put(`/api/issues/${issueToEdit.id}`, value)
      .toPromise()) as Issue;
  }

  async addMessage(issue: Issue, message: string): Promise<Message> {
    const createdMessage = await this.httpClient
      .post<Message>(`/api/issues/${issue.id}/messages`, { text: message })
      .toPromise();
    return createdMessage;
  }

  async deleteIssue(issue: Issue): Promise<void> {
    await this.httpClient.delete(`/api/issues/${issue.id}`).toPromise();
  }
}
