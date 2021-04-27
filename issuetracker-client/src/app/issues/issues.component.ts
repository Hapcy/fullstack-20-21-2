import { Component, OnInit } from '@angular/core';
import { Issue } from '../domain/issue';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  issues: Issue[] = [
    {
      title: 'Rossz projektor',
      description: 'Nem kapcsol be',
    },
    {
      title: 'Rossz számítógép',
      description: 'Lorem ipsum dolor sit amet',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
