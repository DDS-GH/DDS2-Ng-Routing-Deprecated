import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalPageComponent {
  @ViewChild(`cheeseModal`) cheeseModal: ElementRef<HTMLElement>;

  open(e: any) {
    this.cheeseModal[`ddsComponent`].open();
  }

  close(e: any) {
    if (e.target.innerText.match(/non/gi)) {
      console.info(`Non`);
    } else {
      console.info(`Oui`);
    }
    this.cheeseModal[`ddsComponent`].close();
  }
}
