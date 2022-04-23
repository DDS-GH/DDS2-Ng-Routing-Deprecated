import { Component, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { stringToBoolean, debounce, ddsIcon } from "../helpers/dds.helpers";
import { handleResize } from "../helpers/mediasize";

const icons: any = {
  left: ddsIcon(`chevron-left`),
  right: ddsIcon(`chevron-right`)
};

@Component({
  selector: `dds-sidenav`,
  templateUrl: `./sidenav.component.html`,
  styleUrls: [`./sidenav.component.scss`]
})
export class SidenavComponent extends DdsComponent {
  // @ts-ignore
  ngOnInit() {
    super.ngOnInit();
    this.ddsInitializer = `SideNav`;
  }
}
