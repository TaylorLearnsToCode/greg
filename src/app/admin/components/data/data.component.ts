import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { DataState } from '@shared/model/dao/data-state.model';
import { PageDisplayMode } from '@shared/model/ui/page-display-mode.enum';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'greg-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  @ViewChild('importDataStateInput') importDataStateInputRef: ElementRef;

  readonly pageDisplayMode = PageDisplayMode.SINGLE;
  readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;

  dataState$: Observable<DataState>;
  dataStateKeys: string[];
  includeProperties(key: string): string {
    return ['treasureTypes', 'treasureArticles'].includes(key)
      ? 'type,system'
      : 'name';
  }

  private get importDataStateInput(): HTMLInputElement {
    return this.importDataStateInputRef.nativeElement as HTMLInputElement;
  }

  constructor(private dataService: DataManagerService) {}

  ngOnInit(): void {
    this.dataStateKeys = Object.keys(new DataState());
    this.dataState$ = this.dataService.dataState$;
  }

  clearDataState(): void {
    this.dataService.clearAll();
  }

  exportDataState(): void {
    this.dataService.exportAll();
  }

  getStateValue(state: DataState, key: string): any[] {
    return (state as any)[key];
  }

  importDataState(): void {
    this.importDataStateInput.click();
  }

  onImportDataState(): void {
    if (this.importDataStateInput.files?.length) {
      this.dataService.import(this.importDataStateInput.files[0], 'master');
      this.importDataStateInput.value = '';
    }
  }
}
