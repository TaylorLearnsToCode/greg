import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDungeonComponent } from './generate-dungeon.component';

describe('GenerateDungeonComponent', () => {
  let component: GenerateDungeonComponent;
  let fixture: ComponentFixture<GenerateDungeonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateDungeonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateDungeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
