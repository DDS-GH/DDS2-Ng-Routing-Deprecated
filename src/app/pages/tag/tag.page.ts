import { Component } from "@angular/core";

@Component({
  templateUrl: "./tag.page.html"
})
export class TagPageComponent {
  public showButton: boolean = false;

  handleShow(e: any) {
    this.showButton = !this.showButton;
  }
}
