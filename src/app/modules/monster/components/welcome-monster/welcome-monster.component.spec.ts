import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeMonsterComponent } from './welcome-monster.component';

describe('WelcomeMonsterComponent', () => {
  let component: WelcomeMonsterComponent;
  let fixture: ComponentFixture<WelcomeMonsterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeMonsterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeMonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
