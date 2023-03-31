import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTreasureFromTypeComponent } from './generate-treasure-from-type.component';

describe('GenerateTreasureFromTypeComponent', () => {
  let component: GenerateTreasureFromTypeComponent;
  let fixture: ComponentFixture<GenerateTreasureFromTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateTreasureFromTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateTreasureFromTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
