import { Component } from "@angular/core";

@Component({
  templateUrl: "./actionmenu.page.html"
})
// @ts-ignore
export class ActionMenuPageComponent {
  actionMenuAction(e: any) {
    console.info("action menu value chosen: " + e);
  }
}
