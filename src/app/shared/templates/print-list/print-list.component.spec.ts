import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintListComponent } from './print-list.component';

describe('PrintListComponent', () => {
  let component: PrintListComponent;
  let fixture: ComponentFixture<PrintListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
