import { Component } from "@angular/core";

@Component({
  selector: "app-drawer",
  templateUrl: "./drawer.component.html"
})
export class DrawerPageComponent {
  openDrawer(e: any) {
    alert(`this.drawerComponent.openDrawer(e);`);
  }
}
