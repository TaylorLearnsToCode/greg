import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MonsterControllerService } from '@monster/enter-monster/services/monster-controller/monster-controller.service';
import { WwwMonster } from '@shared/model/www-monster.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { Observable } from 'rxjs';

/** Presenter element for showing a monster object. UNDER CONSTRUCTION. */
@Component({
  selector: 'greg-monster-display',
  templateUrl: './monster-display.component.html',
  styleUrls: ['./monster-display.component.scss'],
})
export class MonsterDisplayComponent implements OnInit {
  monster$: Observable<WwwMonster[]>;

  @ViewChild('fileInput')
  importButton: ElementRef;

  get showImport(): boolean {
    return (
      doesExist(this.importButton) &&
      this.importButton.nativeElement.value != ''
    );
  }

  /** MonsterDisplayComponent Constructor */
  constructor(private monsterController: MonsterControllerService) {}

  /** Initializer Method */
  ngOnInit(): void {
    this.monster$ = this.monsterController.monster$;
  }

  exportMonsters(): void {
    this.monsterController.exportMonsters();
  }

  importMonsters(): void {
    this.monsterController.importMonsters(
      this.importButton.nativeElement.files[0]
    );
  }
}
