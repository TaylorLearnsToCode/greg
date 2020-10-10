import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { doesExist } from '@shared/utilities/common-util/common.util';

/** Handler service for moving data out of the session. */
@Injectable({
  providedIn: 'root',
})
export class ExportService {
  /**
   * Export Service Constructor
   * @param  {Document} document
   */
  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Converts a provided object to JSON and calls the browser to download it.
   * @param  {any} obj
   * @param  {string} fileName
   */
  exportAsJson(obj: any, fileName: string): void {
    fileName = doesExist(fileName) ? fileName.replace(' ', '') : 'export';
    const payload: Blob = new Blob([JSON.stringify(obj)], {
      type: 'text/plain',
    });
    const a: HTMLAnchorElement = this.document.createElement('a');
    a.href = URL.createObjectURL(payload);
    a.download = `${fileName}.json`;
    a.target = '_blank';
    a.click();
  }
}
