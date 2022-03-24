import { Component, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";

@Component({
  selector: "dds-badge",
  templateUrl: "./badge.component.html",
  styleUrls: ["./badge.component.scss"]
})
export class BadgeComponent extends DdsComponent {
  @Input() classList: string = ``;
  @Input() icon: string = ``;
  @Input() value: string = ``;
  @Input() units: string = ``;
  public has: any = {
    icon: false,
    value: false,
    units: false
  };

  // @ts-ignore
  ngOnInit() {
    super.ngOnInit();
    this.has.icon = this.icon !== ``;
    this.has.value = this.value !== ``;
    this.has.units = this.units !== ``;
  }
}
