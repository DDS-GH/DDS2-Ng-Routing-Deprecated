import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { setElementId, stringToBoolean } from "../helpers/dds.helpers";

@Component({
  selector: `dds-radio`,
  templateUrl: `./radio.component.html`
})
export class RadioComponent implements OnInit {
  @Output() onChecked: EventEmitter<string> = new EventEmitter<string>();
  @Input() elementId: string = ``;
  @Input() label: string = ``;
  @Input() name: string = ``;
  @Input() value: string = ``;
  @Input() checked: any = ``;

  ngOnInit() {
    this.elementId = setElementId(this.elementId);
    this.checked = stringToBoolean(this.checked);
  }

  handleChange(e: any) {
    this.onChecked.emit(e);
  }
}
