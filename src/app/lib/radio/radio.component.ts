import { Component, Input, OnInit } from "@angular/core";
import { setElementId } from "../helpers/dds.helpers";

@Component({
  selector: `dds-radio`,
  templateUrl: `./radio.component.html`
})
export class RadioComponent implements OnInit {
  @Input() elementId: string = ``;
  @Input() label: string = ``;
  @Input() name: string = ``;
  @Input() value: string = ``;

  ngOnInit() {
    this.elementId = setElementId(this.elementId);
  }
}
