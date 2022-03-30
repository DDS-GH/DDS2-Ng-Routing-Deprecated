import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html"
})
export class ModalPageComponent {
  @ViewChild(`cheeseModal`) cheeseModal: ElementRef<HTMLElement>
  openModal(e: any) {
    this.cheeseModal[`ddsComponent`].open();
  }
}
