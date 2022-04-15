import {
  Component,
  EventEmitter,
  Input,
  AfterViewInit,
  Output
} from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { stringToBoolean } from "../helpers/dds.helpers";

@Component({
  selector: "dds-tag",
  templateUrl: "./tag.component.html"
})
export class TagComponent extends DdsComponent implements AfterViewInit {
  @Output() onDimiss: EventEmitter<string> = new EventEmitter<string>();
  @Input() aria: string = `Dismiss`;
  @Input() dismiss: any = `true`;
  @Input() icon: string = ``;
  @Input() value: string = ``;

  // @ts-ignore
  ngOnInit() {
    super.ngOnInit();
    this.ddsInitializer = `Tag`;
    this.dismiss = stringToBoolean(this.dismiss);
    this.ddsOptions = {
      srDismiss: this.aria,
      dismiss: this.dismiss
    };
  }

  // @ts-ignore
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.ddsElement.addEventListener(`ddsTagDismissEvent`, (e: any) => {
      const thisText: string = this.ddsElement
        .querySelector(`button`)
        .innerText.trim();
      const valueToEmit: any = !this.value
        ? thisText
        : {
            value: this.value,
            text: this.ddsElement.querySelector(`button`).innerText.trim()
          };
      this.onDimiss.emit(valueToEmit);
    });
  }
}
