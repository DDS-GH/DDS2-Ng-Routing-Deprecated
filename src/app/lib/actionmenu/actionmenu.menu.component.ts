import { Component, Input } from "@angular/core";
import { setElementId, ddsIcon } from "../helpers/dds.helpers";
import { MenuService, toState } from "./menu.service";
import { Subscription } from "rxjs";

@Component({
  selector: `dds-actionmenu-menu`,
  templateUrl: `./actionmenu.menu.component.html`,
  styleUrls: [`./actionmenu.menu.component.scss`]
})
export class ActionMenuMenuComponent {
  @Input() id: string;
  @Input() icon: string;
  @Input() name: string = "";
  @Input() separator: boolean = false;
  private open: boolean;
  private parentId: string;
  message: any;

  constructor(private menuState: MenuService) {}

  ngOnInit() {
    this.id = setElementId(this.id);
    this.icon = ddsIcon(this.icon);
  }

  onTitleClick() {
    this.menuState.changeState(toState.open);
  }
}
