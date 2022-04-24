import { Component, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";

@Component({
  selector: "dds-popover",
  templateUrl: "./popover.component.html",
  // styleUrls: ["./popover.component.scss"]
})
export class PopoverComponent extends DdsComponent {
  @Input() icon: string = `alert-info-cir`;
  @Input() srOnly: string = `Popover`;
  @Input() headline: string = ``;
  @Input() srDismiss: string = `Dismiss`;

  override ngOnInit(): void {
    super.ngOnInit();
    this.ddsInitializer = `Popover`;
  }
}
