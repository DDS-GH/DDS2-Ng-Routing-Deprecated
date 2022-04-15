import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
  templateUrl: "./drawer.page.html"
})
export class DrawerPageComponent {
  @ViewChild(`myDrawer`) myDrawer!: ElementRef<HTMLElement>;
  openDrawer(e: any) {
    // @ts-ignore
    this.myDrawer.ddsComponent.open();
  }
}
