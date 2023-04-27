import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureMonsterTypeComponent } from './configure-monster-type.component';

describe('ConfigureMonsterTypeComponent', () => {
  let component: ConfigureMonsterTypeComponent;
  let fixture: ComponentFixture<ConfigureMonsterTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureMonsterTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureMonsterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
