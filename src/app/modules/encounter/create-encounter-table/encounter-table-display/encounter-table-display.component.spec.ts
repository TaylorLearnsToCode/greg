import {
  async,
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
} from '@angular/core/testing';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import {
  EncounterTable,
  EncounterTableActions,
  IEncounterTableAction,
} from '../model/encounter-table.model';
import { Encounter } from '../model/encounter.model';
import { EncounterTableDisplayComponent } from './encounter-table-display.component';

/** Utility class to work  around inputs not wanting me to mock the file list */
class MockFilesElement {
  itemList: File[];
  constructor(itemList?: File[]) {
    if (doesExist(itemList)) {
      this.itemList = itemList;
    }
  }
  item(num: number): any {
    return this.itemList[num];
  }
  returnAsFileList(): FileList {
    return (this as any) as FileList;
  }
}

describe('EncounterTableDisplayComponent', () => {
  let component: EncounterTableDisplayComponent;
  let fixture: ComponentFixture<EncounterTableDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EncounterTableDisplayComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncounterTableDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should allow import/export of JSON', () => {
    let testObject: any;
    let testFile: File;

    beforeEach(() => {
      testObject = { test: 'object' };
      testFile = new File(
        [new Blob([JSON.stringify(testObject)], { type: 'text/plain' })],
        'testFile'
      );
    });

    it('should allow a user to clear the imported file', () => {
      component.importedRawFile = testFile;
      component.clearImportFile();
      expect(component.importedRawFile).toBeUndefined();
    });

    it('should delegate an import action', fakeAsync(() => {
      testFile.text = () =>
        new Promise<string>((resolve) => resolve(JSON.stringify(testObject)));
      component.importedRawFile = testFile;
      const eventSpy = spyOn(component.encounterTableAction, 'emit');
      component.importFromJson();
      flushMicrotasks();
      expect(eventSpy).toHaveBeenCalledWith({
        action: EncounterTableActions.UPDATE_TABLE,
        payload: testObject,
      });
    }));

    it('should allow a user to import from JSON', () => {
      const testInput = document.createElement('input');
      spyOnProperty(testInput, 'files').and.returnValue(
        new MockFilesElement([testFile]).returnAsFileList()
      );
      expect(component.importedRawFile).toBeUndefined();
      component.onFileInput(testInput);
      expect(component.importedRawFile).toEqual(testFile);
    });
  });

  it('should delegate an action export the curret table as a JSON', () => {
    const encounterTableActionSpy = spyOn(
      component.encounterTableAction,
      'emit'
    ).and.callFake(() => {});
    const encounterTable = new EncounterTable(
      [new DiceRolled(1, 6)],
      [new Encounter(1)]
    );
    const expectedPayload: IEncounterTableAction = {
      action: EncounterTableActions.EXPORT_JSON,
      payload: encounterTable,
    } as IEncounterTableAction;
    component.encounterTable = encounterTable;
    component.exportToJson();
    expect(encounterTableActionSpy).toHaveBeenCalledWith(expectedPayload);
  });
});
