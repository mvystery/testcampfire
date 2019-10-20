import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProTrialComponent } from './pro-trial.component';

describe('ProTrialComponent', () => {
  let component: ProTrialComponent;
  let fixture: ComponentFixture<ProTrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProTrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
