import { Component, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";

@Component({
  selector: "dds-tooltip",
  templateUrl: "./tooltip.component.html"
})
export class TooltipComponent extends DdsComponent {
  @Input() icon: string = `alert-info-cir`;
  @Input() srOnly: string = `Tooltip`;
  @Input() title: string = ``;
  @Input() content: string = ``;

  override ngOnInit(): void {
    super.ngOnInit();
    this.ddsInitializer = `Tooltip`;
  }
}
