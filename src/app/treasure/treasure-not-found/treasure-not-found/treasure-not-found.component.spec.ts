import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasureNotFoundComponent } from './treasure-not-found.component';

describe('TreasureNotFoundComponent', () => {
  let component: TreasureNotFoundComponent;
  let fixture: ComponentFixture<TreasureNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreasureNotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreasureNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
