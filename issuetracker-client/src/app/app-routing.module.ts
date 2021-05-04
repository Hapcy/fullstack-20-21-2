import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { IssueDetailsComponent } from './issue-details/issue-details.component';
import { IssuesComponent } from './issues/issues.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
  path: 'issues',
  component: IssuesComponent,
  canActivate: [AuthGuard],
}, {
  path: 'issues/:issueId',
  component: IssueDetailsComponent,
  canActivate: [AuthGuard],
}, {
  path: 'login',
  component: LoginComponent,
}, {
  path: '**',
  redirectTo: '/issues',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
