import { TestBed } from '@angular/core/testing';
import { ExportService } from './export.service';

describe('ExportService', () => {
  let anchorSpy: jasmine.SpyObj<HTMLAnchorElement>;
  let documentSpy: jasmine.Spy;
  let service: ExportService;

  const CONST_FILE_NAME = 'HelloDolly';
  const TEST_FILE_NAME = 'Hello Dolly';
  const TEST_OBJECT = { hello: 'dolly' };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportService);

    anchorSpy = jasmine.createSpyObj('HTMLAnchorElement', [
      'href',
      'download',
      'target',
      'click',
    ]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should export a JSON titled "${CONST_FILE_NAME}"`, () => {
    documentSpy = spyOn(document, 'createElement').and.callFake(
      () => anchorSpy
    );
    service.exportAsJson(TEST_OBJECT, TEST_FILE_NAME);
    expect(documentSpy).toHaveBeenCalledWith('a');
    expect(anchorSpy.href).toBeDefined();
    expect(anchorSpy.download).toEqual(`${CONST_FILE_NAME}.json`);
    expect(anchorSpy.click).toHaveBeenCalled();
  });

  it('should export a JSON titled "export"', () => {
    documentSpy = spyOn(document, 'createElement').and.callFake(
      () => anchorSpy
    );
    service.exportAsJson(TEST_OBJECT, null);
    expect(anchorSpy.download).toEqual('export.json');
    expect(anchorSpy.click).toHaveBeenCalled();
  });
});
