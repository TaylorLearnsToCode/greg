import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DicePoolFormComponent } from './dice-pool-form.component';

describe('DicePoolFormComponent', () => {
  let component: DicePoolFormComponent;
  let fixture: ComponentFixture<DicePoolFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DicePoolFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DicePoolFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
