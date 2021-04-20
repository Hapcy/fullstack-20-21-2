import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DummyComponent } from './dummy/dummy.component';
import { IssuesComponent } from './issues/issues.component';

const routes: Routes = [{
  path: 'issues',
  component: IssuesComponent,
}, {
  path: 'dummy',
  component: DummyComponent,
}, {
  path: '**',
  redirectTo: '/issues',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
