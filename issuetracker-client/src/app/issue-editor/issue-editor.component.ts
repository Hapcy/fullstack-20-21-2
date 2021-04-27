import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Issue } from '../domain/issue';

@Component({
  selector: 'app-issue-editor',
  templateUrl: './issue-editor.component.html',
  styleUrls: ['./issue-editor.component.scss']
})
export class IssueEditorComponent implements OnInit {

  issue: Issue = {
    title: '',
    description: '',
  };

  constructor() { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    if (form.valid) {
      console.log(this.issue);
    }
  }

}
