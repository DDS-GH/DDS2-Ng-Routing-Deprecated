import { Component, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";

@Component({
  selector: "dds-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent extends DdsComponent {
  @Input() ariaLabel: string = ``;
  @Input() action: string = ``;
  @Input() type: string = `text`;
}
