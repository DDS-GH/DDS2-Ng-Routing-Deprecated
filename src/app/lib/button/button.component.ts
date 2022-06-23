import { Component, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { stringToBoolean } from "../helpers/dds.helpers";

@Component({
  selector: "dds-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent extends DdsComponent {
  @Input() ariaLabel: string = ``;
  @Input() action: string = ``; // for "attaching" the button to an ActionMenu.  Experimental.
  @Input() type: string = `text`;
  @Input() disabled: any = `false`;

  override ngOnInit(): void {
    super.ngOnInit();
    this.disabled = stringToBoolean(this.disabled);
  }
}
