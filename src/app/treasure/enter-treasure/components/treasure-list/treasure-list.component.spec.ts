import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasureListComponent } from './treasure-list.component';

describe('TreasureListComponent', () => {
  let component: TreasureListComponent;
  let fixture: ComponentFixture<TreasureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreasureListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreasureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
