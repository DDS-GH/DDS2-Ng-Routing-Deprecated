import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-drawer",
  templateUrl: "./drawer.component.html"
})
export class DrawerPageComponent {
  @ViewChild(`myDrawer`) myDrawer: ElementRef<HTMLElement>
  openDrawer(e: any) {
    this.myDrawer[`ddsComponent`].open();
  }
}
