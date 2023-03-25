import { Component, OnInit } from '@angular/core';
import { TreasureRollResult } from '@treasure/enter-treasure/model/treasure-list-entry.model';
import { RollTreasureControllerService } from '@treasure/enter-treasure/services/roll-treasure-controller/roll-treasure-controller.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'greg-roll-treasure',
  templateUrl: './roll-treasure.component.html',
  styleUrls: ['./roll-treasure.component.scss'],
})
export class RollTreasureComponent implements OnInit {
  rolledTreasure$: Observable<TreasureRollResult>;

  constructor(private controllerService: RollTreasureControllerService) {}

  ngOnInit(): void {
    this.rolledTreasure$ = this.controllerService.rolledTreasure$;
  }
}
