import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonsterNotFoundComponent } from './monster-not-found.component';

describe('WelcomeMonsterComponent', () => {
  let component: MonsterNotFoundComponent;
  let fixture: ComponentFixture<MonsterNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MonsterNotFoundComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
