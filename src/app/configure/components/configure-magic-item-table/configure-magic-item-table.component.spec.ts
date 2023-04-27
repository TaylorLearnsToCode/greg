import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureMagicItemTableComponent } from './configure-magic-item-table.component';

describe('ConfigureMagicItemTableComponent', () => {
  let component: ConfigureMagicItemTableComponent;
  let fixture: ComponentFixture<ConfigureMagicItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureMagicItemTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureMagicItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
