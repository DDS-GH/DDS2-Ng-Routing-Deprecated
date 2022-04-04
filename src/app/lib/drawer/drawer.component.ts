import { Component, ElementRef, ViewChild, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";

@Component({
  selector: `dds-drawer`,
  templateUrl: `./drawer.component.html`,
  styleUrls: [`./drawer.component.scss`]
})
export class DrawerComponent extends DdsComponent {
  @ViewChild("triggerContainer") triggerContainer: ElementRef<HTMLElement>;
  @Input() icon: string = ``; // changing the close icon of a drawer is not design-approved
  @Input() backText: string = `Back`;

  ngOnInit() {
    super.ngOnInit();
    this.ddsInitializer = `Drawer`;
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.icon) {
      this.ddsElement.querySelector(
        `.dds__drawer__close`
      ).innerHTML = `<i class="dds__icon dds__icon--${this.icon}"></i>&nbsp;&nbsp;${this.backText}`;
    }
  }

  openDrawer = (e: any) => {
    if (this.ddsComponent) this.ddsComponent.open();
  };

  close = (e: any) => {
    if (this.ddsComponent) this.ddsComponent.close();
  };
}
