import { Component, Input } from "@angular/core";
import { stringToBoolean, ddsIcon } from "../helpers/dds.helpers";

@Component({
  selector: `dds-sidenav-menu`,
  templateUrl: `./sidenav.menu.component.html`,
  styleUrls: [`./sidenav.menu.component.scss`]
})
export class SidenavMenuComponent {
  @Input() openState: any = `false`;
  @Input() icon: string = ``;
  @Input() name: string = ``;
  @Input() svg: any = `false`;

  ngOnInit() {
    this.openState = stringToBoolean(this.openState);
    this.svg = stringToBoolean(this.svg);
    if (this.icon.length > 0) {
      this.icon = ddsIcon(this.icon);
    }
  }
}
