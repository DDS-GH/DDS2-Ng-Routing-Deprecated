import { Component, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";

@Component({
  selector: "dds-tooltip",
  templateUrl: "./tooltip.component.html",
  styleUrls: ["./tooltip.component.scss"]
})
export class TooltipComponent extends DdsComponent {
  @Input() icon: string;
  @Input() placement: "top" | "right" | "bottom" | "left" = "top";

  ngOnInit() {
    super.ngOnInit();
    this.ddsInitializer = `Tooltip`;
    if (!this.icon) {
      this.icon = `alert-info-cir`;
    }
    this.ddsOptions = {
      placement: this.placement
    };
  }
}
