import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IssueService } from './issue.service';

describe('IssueService', () => {
  let service: IssueService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(IssueService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getIssues', () => {
    it('should call backend for issues', async () => {
      const issuesPromise = service.getIssues();

      httpMock.expectOne('/api/issues').flush([]);

      expect(await issuesPromise).toEqual([]);

      httpMock.verify();
    });
  });
});
