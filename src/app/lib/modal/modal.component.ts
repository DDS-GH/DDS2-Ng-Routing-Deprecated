import { Component, ElementRef, ViewChild, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { Uuid, stringToBoolean } from "../helpers/dds.helpers";

@Component({
  selector: `dds-modal`,
  templateUrl: `./modal.component.html`,
  styleUrls: [`./modal.component.scss`]
})
export class ModalComponent extends DdsComponent {
  @ViewChild("triggerContainer") triggerContainer: ElementRef<HTMLElement>;
  @Input() elementId: string;
  @Input() backdrop: any;
  private modalTitleId: string;
  private modalTriggerId: string;

  ngOnInit() {
    super.ngOnInit();
    this.backdrop = stringToBoolean(this.backdrop);
    this.ddsInitializer = `Modal`;
    this.modalTitleId = `${this.ddsInitializer}-title${Uuid()}`;
    this.modalTriggerId = `${this.ddsInitializer}-trigger${Uuid()}`;
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.ddsComponent.element.addEventListener(`click`, (e) => {
      if (this.backdrop && e.target.getAttribute(`role`) === `dialog`) {
        this.ddsComponent.close();
      }
    });
  }

  openModal = (e: any) => {
    if (this.ddsComponent) this.ddsComponent.open();
  };
}
