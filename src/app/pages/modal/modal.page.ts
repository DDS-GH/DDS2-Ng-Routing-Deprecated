import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  templateUrl: "./modal.page.html"
})
export class ModalPageComponent {
  @ViewChild(`cheeseModal`) cheeseModal!: ElementRef<HTMLElement>;

  open(e: any) {
    // @ts-ignore
    this.cheeseModal.ddsComponent.open();
  }

  close(e: any) {
    if (e.target.innerText.match(/non/gi)) {
      console.info(`Non`);
    } else {
      console.info(`Oui`);
    }
    // @ts-ignore
    this.cheeseModal.ddsComponent.close();
  }
}
