import { Component, OnInit } from '@angular/core';
import { MapOrMagicControllerServiceService } from '@treasure/enter-map-or-magic/services/map-or-magic-controller-service/map-or-magic-controller-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'greg-enter-map-or-magic',
  templateUrl: './enter-map-or-magic.component.html',
  styleUrls: ['./enter-map-or-magic.component.scss'],
})
export class EnterMapOrMagicComponent implements OnInit {
  enteringMagicItem$: Observable<boolean>;

  constructor(private controllerService: MapOrMagicControllerServiceService) {}

  ngOnInit(): void {
    this.enteringMagicItem$ = this.controllerService.enteringMagicItem$;
  }
}
