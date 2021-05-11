import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IssueService } from '../core/issue.service';
import { Issue } from '../domain/issue';

@Component({
  selector: 'app-issue-editor',
  templateUrl: './issue-editor.component.html',
  styleUrls: ['./issue-editor.component.scss'],
})
export class IssueEditorComponent implements OnInit {
  issueForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
    place: ['', [Validators.required]],
  });

  get title(): FormControl {
    return this.issueForm.get('title') as FormControl;
  }

  get place(): FormControl {
    return this.issueForm.get('place') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private issueService: IssueService,
    @Optional() public dialogRef?: MatDialogRef<IssueEditorComponent>,
    @Inject(MAT_DIALOG_DATA) @Optional() private issueToEdit?: Issue
  ) {}

  ngOnInit(): void {
    if (this.issueToEdit) {
      this.issueForm.reset({
        title: this.issueToEdit.title,
        description: this.issueToEdit.description,
        place: this.issueToEdit.place,
      });
    }
  }

  async submit(): Promise<void> {
    this.issueForm.markAllAsTouched();
    if (this.issueForm.valid) {
      if (this.issueToEdit) {
        await this.issueService.editIssue(this.issueToEdit, this.issueForm.value);
      } else {
        await this.issueService.createIssue(this.issueForm.value);
      }

      this.dialogRef?.close();
    }
  }

  cancel(): void {
    this.dialogRef?.close();
  }
}
