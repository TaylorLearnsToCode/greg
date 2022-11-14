import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecieFormComponent } from './specie-form.component';

describe('SpecieFormComponent', () => {
  let component: SpecieFormComponent;
  let fixture: ComponentFixture<SpecieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecieFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
