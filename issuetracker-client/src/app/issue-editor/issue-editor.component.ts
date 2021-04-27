import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Issue } from '../domain/issue';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue-editor',
  templateUrl: './issue-editor.component.html',
  styleUrls: ['./issue-editor.component.scss'],
})
export class IssueEditorComponent implements OnInit {
  issueForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
  });

  get title(): FormControl {
    return this.issueForm.get('title') as FormControl;
  }

  constructor(private fb: FormBuilder, private issueService: IssueService) {}

  ngOnInit(): void {}

  submit(): void {
    if (this.issueForm.valid) {
      this.issueService.createIssue(this.issueForm.value);
      // then go to issue list
    }
  }
}
