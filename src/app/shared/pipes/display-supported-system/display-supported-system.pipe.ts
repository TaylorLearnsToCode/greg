import { Pipe, PipeTransform } from '@angular/core';
import { SUPPORTED_SYSTEMS } from '@assets/app-configs/supported-systems.config';

@Pipe({
  name: 'displaySupportedSystem',
})
export class DisplaySupportedSystemPipe implements PipeTransform {
  private SUPPORTED_SYSTEMS = SUPPORTED_SYSTEMS;

  transform(system: string, showAcronymn?: boolean): string {
    return ''.concat(
      (this.SUPPORTED_SYSTEMS as any)[system],
      showAcronymn ? ` (${system})` : ''
    );
  }
}
