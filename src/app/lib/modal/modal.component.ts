import { Component, ElementRef, ViewChild, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { stringToBoolean } from "../helpers/dds.helpers";

@Component({
  selector: `dds-modal`,
  templateUrl: `./modal.component.html`
})
export class ModalComponent extends DdsComponent {
  @ViewChild(`honeypot`) honeypot!: ElementRef<HTMLElement>;
  @ViewChild("triggerContainer") triggerContainer!: ElementRef<HTMLElement>;
  @Input() backdrop: any; // Allows close-on-backdrop; not Design-approved
  public focusableElements: string = `button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`;
  public firstFocusableElement: any = ``;
  public focusableContent: any = ``;
  public lastFocusableElement: any = ``;

  // @ts-ignore
  ngOnInit() {
    super.ngOnInit();
    this.backdrop = stringToBoolean(this.backdrop);
    this.ddsInitializer = `Modal`;
  }

  // @ts-ignore
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.firstFocusableElement = this.ddsElement.querySelectorAll(
      this.focusableElements
    )[0]; // get first element to be focused inside modal
    this.focusableContent = this.ddsElement.querySelectorAll(
      this.focusableElements
    );
    this.lastFocusableElement = this.focusableContent[
      this.focusableContent.length - 1
    ]; // get last element to be focused inside modal
    this.ddsElement.addEventListener(`click`, (e: any) => {
      if (this.backdrop && e.target.getAttribute(`role`) === `dialog`) {
        this.ddsComponent.close();
      }
    });
    this.ddsElement.addEventListener(`ddsModalOpenedEvent`, (e: any) => {
      this.firstFocusableElement.focus();
    });
    setTimeout(() => {
      this.isolateModal();
    });
  }

  isolateModal() {
    const self: any = this;
    document.addEventListener("keydown", function (e) {
      let isTabPressed = e.key === "Tab" || e.keyCode === 9;

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        // if shift key pressed for shift + tab combination
        if (document.activeElement === self.firstFocusableElement) {
          self.lastFocusableElement.focus(); // add focus for the last focusable element
          e.preventDefault();
        }
      } else {
        // if tab key is pressed
        if (document.activeElement === self.lastFocusableElement) {
          // if focused has reached to last focusable element then focus first focusable element after pressing tab
          self.firstFocusableElement.focus(); // add focus for the first focusable element
          e.preventDefault();
        }
      }
    });
    this.firstFocusableElement.focus();
  }

  // close() {
  //   this.ddsComponent.close();
  // }

  // open() {
  //   this.ddsComponent.open();
  // }
}
