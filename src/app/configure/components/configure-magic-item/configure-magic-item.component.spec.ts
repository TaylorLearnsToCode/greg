import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureMagicItemComponent } from './configure-magic-item.component';

describe('ConfigureMagicItemComponent', () => {
  let component: ConfigureMagicItemComponent;
  let fixture: ComponentFixture<ConfigureMagicItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureMagicItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureMagicItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
