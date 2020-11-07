import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigureEncounterTableFormComponent } from '@encounter/create-encounter-table-deux/components/configure-encounter-table-form/configure-encounter-table-form.component';

describe('EncounterTableConfigFormComponent', () => {
  let component: ConfigureEncounterTableFormComponent;
  let fixture: ComponentFixture<ConfigureEncounterTableFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigureEncounterTableFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureEncounterTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
