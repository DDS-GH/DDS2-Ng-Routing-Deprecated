import { Component } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html"
})
export class ButtonPageComponent {
  public splitButtonValue: string = `Country`;
  public splitButton2Value: string = `Singer`;

  actionMenuAction(e: any) {
    this.splitButtonValue = e;
  }

  actionMenu2Action(e: any) {
    this.splitButton2Value = e;
  }
}
