import { Component } from "@angular/core";

@Component({
  selector: "app-actionmenu",
  templateUrl: "./actionmenu.component.html"
})
// @ts-ignore
export class ActionMenuPageComponent {
  actionMenuAction(e: any) {
    console.log("action menu value chosen: " + e);
  }
}
