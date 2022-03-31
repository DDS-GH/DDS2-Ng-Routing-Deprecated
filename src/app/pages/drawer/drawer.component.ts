import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
  templateUrl: "./drawer.component.html"
})
export class DrawerPageComponent {
  @ViewChild(`myDrawer`) myDrawer: ElementRef<HTMLElement>;
  openDrawer(e: any) {
    this.myDrawer[`ddsComponent`].open();
  }
}
