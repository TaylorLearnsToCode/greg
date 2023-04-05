import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollableTableTemplateComponent } from './rollable-table-template.component';

describe('RollableTableTemplateComponent', () => {
  let component: RollableTableTemplateComponent;
  let fixture: ComponentFixture<RollableTableTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollableTableTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollableTableTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
