import { ExportService } from '../../app/shared/services/export/export.service';

export function getExportServiceSpy(): jasmine.SpyObj<ExportService> {
  return jasmine.createSpyObj('ExportService', ['exportAsJson']);
}
