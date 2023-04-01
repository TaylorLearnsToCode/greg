import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { Observable, Subject } from 'rxjs';

/** Handler class for import and export of GREG files */
@Injectable({
  providedIn: 'root',
})
export class ImportExportService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Exports a given file to JSON format with some specified properties
   *
   * @param  {any} obj
   * @param  {string} fileName optional: default "export"
   * @param  {string} fileType optional: default "json"
   */
  exportObject(obj: any, fileName?: string, fileType?: string): void {
    const a: HTMLAnchorElement = this.document.createElement('a');
    a.href = URL.createObjectURL(this.buildPayload(obj));
    a.download = `${this.deriveFileName(fileName)}.${this.deriveFileType(
      fileType
    )}`;
    a.target = '_blank';
    a.click();
  }

  /**
   * For a provided File, returns a self-closing observable emitting
   * one result of type T.
   *
   * @param  {File} file
   */
  readFile<T>(file: File): Observable<T> {
    const resultSource = new Subject<T>();
    const fileReader: FileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const result: T = JSON.parse(fileReader.result as string);
      resultSource.next(result);
      resultSource.complete();
    });
    fileReader.readAsText(file);
    return resultSource.asObservable();
  }

  /**
   * Converts a given object into a Blob for export to file.
   *
   * @param  {any} obj
   */
  private buildPayload(obj: any): Blob {
    if (!doesExist(obj)) {
      throw Error('No object provided for export');
    }
    return new Blob([JSON.stringify(obj)], {
      type: 'text/plain',
    });
  }

  /**
   * For a given file name, returns a space-less version of the name to be applied
   * to a given file for export.
   *
   * @param  {string} fileName optional: default "export"
   */
  private deriveFileName(fileName?: string): string {
    if (fileName == undefined) {
      fileName = 'export';
    }
    return doesExist(fileName) ? fileName.replaceAll(' ', '') : 'export';
  }

  /**
   * Based on a provided fileType argument, returns the file type to be applied
   * to a given file for import/export
   *
   * @param  {string} fileType optional: default "json"
   */
  private deriveFileType(fileType?: string): string {
    if (fileType == undefined) {
      fileType = 'json';
    }
    return doesExist(fileType)
      ? fileType.charAt(0) === '.'
        ? fileType.substring(1)
        : fileType
      : 'json';
  }
}
