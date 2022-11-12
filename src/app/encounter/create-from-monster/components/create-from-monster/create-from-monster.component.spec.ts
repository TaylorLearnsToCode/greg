import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFromMonsterComponent } from './create-from-monster.component';

describe('CreateFromMonsterComponent', () => {
  let component: CreateFromMonsterComponent;
  let fixture: ComponentFixture<CreateFromMonsterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFromMonsterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFromMonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
