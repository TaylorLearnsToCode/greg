import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasureArticleFormComponent } from './treasure-article-form.component';

describe('TreasureArticleFormComponent', () => {
  let component: TreasureArticleFormComponent;
  let fixture: ComponentFixture<TreasureArticleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreasureArticleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreasureArticleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
