import { Component, ElementRef, ViewChild, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { stringToBoolean } from "../helpers/dds.helpers";

@Component({
  selector: `dds-datepicker`,
  templateUrl: `./datepicker.component.html`,
  styleUrls: [`./datepicker.component.scss`]
})
export class DatePickerComponent extends DdsComponent {
  @Input() label: string = ``;
  @Input() placeholder: string = ``;
  @Input() required: any = `false`;
  @Input() maxlength: string = `256`;
  @Input() helper: string = ``;
  @Input() fullClick: any = `false`;
  @Input() isDisabled: any = `false`;

  override ngOnInit() {
    super.ngOnInit();
    this.ddsInitializer = `DatePicker`;
    this.required = stringToBoolean(this.required);
    this.fullClick = stringToBoolean(this.fullClick);
    this.isDisabled = stringToBoolean(this.isDisabled);
  }

  handleInput(e: any) {
    if (this.fullClick) {
      this.ddsElement.querySelector(`.dds__date-picker__calendar-button`).click();
    }
  }
}
