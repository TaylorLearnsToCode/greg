import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSystemsComponent } from './select-systems.component';

describe('SelectSystemsComponent', () => {
  let component: SelectSystemsComponent;
  let fixture: ComponentFixture<SelectSystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSystemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
