import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicItemPresenterComponent } from './magic-item-presenter.component';

describe('MagicItemPresenterComponent', () => {
  let component: MagicItemPresenterComponent;
  let fixture: ComponentFixture<MagicItemPresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagicItemPresenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagicItemPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
