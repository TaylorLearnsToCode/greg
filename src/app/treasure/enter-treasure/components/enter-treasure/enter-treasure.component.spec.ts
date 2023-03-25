import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterTreasureComponent } from './enter-treasure.component';

describe('EnterTreasureComponent', () => {
  let component: EnterTreasureComponent;
  let fixture: ComponentFixture<EnterTreasureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterTreasureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterTreasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
