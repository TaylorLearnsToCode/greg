import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollableTableComponent } from './rollable-table.component';

describe('RollableTableComponent', () => {
  let component: RollableTableComponent;
  let fixture: ComponentFixture<RollableTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollableTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
