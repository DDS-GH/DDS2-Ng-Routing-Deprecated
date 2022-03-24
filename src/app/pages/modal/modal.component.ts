import { Component } from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html"
})
export class ModalPageComponent {
  openModal(e: any) {
    alert(`not this.modalComponent.openModal(e);`);
  }
}
