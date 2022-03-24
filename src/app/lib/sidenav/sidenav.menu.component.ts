import { Component, Input } from "@angular/core";
import { setElementId, stringToBoolean, ddsIcon } from "../helpers/dds.helpers";

@Component({
  selector: `dds-sidenav-menu`,
  templateUrl: `./sidenav.menu.component.html`,
  styleUrls: [`./sidenav.menu.component.scss`]
})
export class SidenavMenuComponent {
  @Input() elementId: string;
  @Input() openState: string;
  @Input() icon: string;
  @Input() name: string;
  private open: boolean;

  ngOnInit() {
    this.elementId = setElementId(this.elementId);
    this.open = stringToBoolean(this.openState);
    this.icon = ddsIcon(this.icon);
  }
}
