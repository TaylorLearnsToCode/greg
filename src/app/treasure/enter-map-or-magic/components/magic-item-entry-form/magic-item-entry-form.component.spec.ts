import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicItemEntryFormComponent } from './magic-item-entry-form.component';

describe('MagicItemEntryFormComponent', () => {
  let component: MagicItemEntryFormComponent;
  let fixture: ComponentFixture<MagicItemEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagicItemEntryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagicItemEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
