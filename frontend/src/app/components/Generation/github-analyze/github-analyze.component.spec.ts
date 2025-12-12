import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitHubAnalyzeComponent } from './github-analyze.component';

describe('GitHubAnalyzeComponent', () => {
  let component: GitHubAnalyzeComponent;
  let fixture: ComponentFixture<GitHubAnalyzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitHubAnalyzeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GitHubAnalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});