import { Component, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";

@Component({
  selector: `dds-moreless`,
  templateUrl: `./moreless.component.html`
})
export class MoreLessComponent extends DdsComponent {
  @Input() elementId: string;
  @Input() title: string;
  @Input() more: string = `View More`;
  @Input() less: string = `View Less`;
  @Input() srMore: string;
  @Input() srLess: string;
  @Input() type: "related" | "list" | "bottom" | "inline" = "related";

  ngOnInit() {
    super.ngOnInit();
    this.ddsInitializer = `MoreLess`;
    if (this.srMore && !this.srLess) {
      this.srLess = this.srMore;
    } else if (this.srLess && !this.srMore) {
      this.srMore = this.srLess;
    }
  }

  open = (e: any) => {
    if (this.ddsComponent) this.ddsComponent.open();
  };
}
