import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterDisplayComponent } from './monster-display.component';

describe('MonsterDisplayComponent', () => {
  let component: MonsterDisplayComponent;
  let fixture: ComponentFixture<MonsterDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonsterDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
