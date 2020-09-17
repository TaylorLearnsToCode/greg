import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterMonsterComponent } from './enter-monster.component';

describe('EnterMonsterComponent', () => {
  let component: EnterMonsterComponent;
  let fixture: ComponentFixture<EnterMonsterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterMonsterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterMonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
