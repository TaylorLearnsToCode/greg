import { Component, Input, OnInit } from '@angular/core';
import { MagicItemTable } from '@treasure/treasure-common/model/magic-item.model';

@Component({
  selector: 'greg-magic-item-table-presenter',
  templateUrl: './magic-item-presenter.component.html',
  styleUrls: ['./magic-item-presenter.component.scss'],
})
export class MagicItemPresenterComponent implements OnInit {
  @Input()
  magicItem: MagicItemTable;

  constructor() {}

  ngOnInit(): void {}
}
