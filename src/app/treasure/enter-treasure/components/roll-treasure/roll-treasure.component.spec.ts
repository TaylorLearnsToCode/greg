import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollTreasureComponent } from './roll-treasure.component';

describe('RollTreasureComponent', () => {
  let component: RollTreasureComponent;
  let fixture: ComponentFixture<RollTreasureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollTreasureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollTreasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
