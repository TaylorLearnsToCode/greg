import { Component, OnInit } from '@angular/core';
import { TreasureList } from '@treasure/enter-treasure/model/treasure-list.model';
import { EnterTreasureControllerService } from '@treasure/enter-treasure/services/enter-treasure-controller/enter-treasure-controller.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'greg-treasure-list',
  templateUrl: './treasure-list.component.html',
  styleUrls: ['./treasure-list.component.scss'],
})
export class TreasureListComponent implements OnInit {
  treasureList$: Observable<TreasureList>;

  constructor(private controllerService: EnterTreasureControllerService) {}

  ngOnInit(): void {
    this.treasureList$ = this.controllerService.treasureList$;
  }
}
