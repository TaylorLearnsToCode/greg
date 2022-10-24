import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SaveAsFormComponent } from './save-as-form.component';

describe('SaveAsFormComponent', () => {
  let component: SaveAsFormComponent;
  let fixture: ComponentFixture<SaveAsFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveAsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveAsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
