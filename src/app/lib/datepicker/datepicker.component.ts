import { Component, EventEmitter, ElementRef, ViewChild, Input, Output } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { debounce, stringToBoolean } from "../helpers/dds.helpers";

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
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  override ngOnInit(): void {
    super.ngOnInit();
    this.ddsInitializer = `DatePicker`;
    this.required = stringToBoolean(this.required);
    this.fullClick = stringToBoolean(this.fullClick);
    this.isDisabled = stringToBoolean(this.isDisabled);
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.ddsElement.addEventListener(`ddsDatePickerSelectDateEvent`, (e: any) => {
      this.onChange.emit(e.detail);
    })
  }

  handleInput(e: any) {
    if (this.fullClick) {
      this.ddsElement.querySelector(`.dds__date-picker__calendar-button`).click();
    }
  }

  handleChange(e: any) {
    this.onChange.emit({
      "formattedDate": e.target.value,
      "date": new Date(e.target.value)
    });
  }
}
