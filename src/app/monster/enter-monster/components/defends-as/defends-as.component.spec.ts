import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefendsAsComponent } from './defends-as.component';

describe('DefendsAsComponent', () => {
  let component: DefendsAsComponent;
  let fixture: ComponentFixture<DefendsAsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefendsAsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefendsAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
