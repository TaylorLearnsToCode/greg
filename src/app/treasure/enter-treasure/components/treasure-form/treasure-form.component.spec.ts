import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasureFormComponent } from './treasure-form.component';

describe('TreasureFormComponent', () => {
  let component: TreasureFormComponent;
  let fixture: ComponentFixture<TreasureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreasureFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreasureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
