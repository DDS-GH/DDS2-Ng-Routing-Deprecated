import { Component, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { tryParseOptions } from "../helpers/dds.helpers";

@Component({
  selector: "dds-popover",
  templateUrl: "./popover.component.html"
})
export class PopoverComponent extends DdsComponent {
  @Input() icon: string = `alert-info-cir`;
  @Input() srOnly: string = `Popover`;
  @Input() headline: string = ``;
  @Input() srDismiss: string = `Dismiss`;
  public triggerId: string = ``;

  // @ts-ignore
  override ngOnInit(): void {
    super.ngOnInit();
    this.ddsInitializer = `Popover`;
    this.ddsOptions = tryParseOptions(this.ddsOptions);
    if (!this.ddsOptions.trigger) {
      this.ddsOptions.trigger = `#${this.elementId}Trigger`;
      this.triggerId = `${this.elementId}Trigger`;
    } else if (this.ddsOptions.trigger.indexOf(`#`) < 0) {
      this.ddsOptions.trigger = `#${this.ddsOptions.trigger}`;
    }
  }

}
