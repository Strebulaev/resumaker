import { TestBed } from '@angular/core/testing';

import { ResumeGenerationService } from './resume-generation.service';

describe('ProfileGenerationService', () => {
  let service: ResumeGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumeGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
