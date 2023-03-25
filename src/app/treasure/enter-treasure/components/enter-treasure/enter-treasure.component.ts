import { Component, OnInit } from '@angular/core';
import { RollTreasureControllerService } from '@treasure/enter-treasure/services/roll-treasure-controller/roll-treasure-controller.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'greg-enter-treasure',
  templateUrl: './enter-treasure.component.html',
  styleUrls: ['./enter-treasure.component.scss'],
})
export class EnterTreasureComponent implements OnInit {
  areEnteringTreasure$: Observable<boolean>;

  constructor(private rollTreasureService: RollTreasureControllerService) {}

  ngOnInit(): void {
    this.areEnteringTreasure$ = this.rollTreasureService.areEnteringTreasure$;
  }
}
