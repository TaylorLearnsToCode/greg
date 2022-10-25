import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MonsterFormComponent } from './monster-form.component';

describe('MonsterFormComponent', () => {
  let component: MonsterFormComponent;
  let fixture: ComponentFixture<MonsterFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MonsterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
