import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { DdsComponent } from '../helpers/dds.component';
import { stringToBoolean } from '../helpers/dds.helpers';

@Component({
  selector: `dds-modal`,
  templateUrl: `./modal.component.html`,
  styleUrls: [`./modal.component.scss`],
})
export class ModalComponent extends DdsComponent {
  @ViewChild('triggerContainer') triggerContainer: ElementRef<HTMLElement>;
  @Input() backdrop: any; // Allows close-on-backdrop; not Design-approved

  // @ts-ignore
  ngOnInit() {
    super.ngOnInit();
    this.backdrop = stringToBoolean(this.backdrop);
    this.ddsInitializer = `Modal`;
  }

  // @ts-ignore
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.ddsComponent.element.addEventListener(`click`, (e: any) => {
      if (this.backdrop && e.target.getAttribute(`role`) === `dialog`) {
        this.ddsComponent.close();
      }
    });
  }
}
