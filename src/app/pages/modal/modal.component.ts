import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html"
})
export class ModalPageComponent {
  @ViewChild(`myModal`) myModal: ElementRef<HTMLElement>
  openModal(e: any) {
    this.myModal[`ddsComponent`].open();
  }
}
