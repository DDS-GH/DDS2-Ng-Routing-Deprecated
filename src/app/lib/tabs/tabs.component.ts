import { Component, ElementRef, ViewChild, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
@Component({
  selector: `dds-tabs`,
  templateUrl: `./tabs.component.html`
})
export class TabsComponent extends DdsComponent {
  override ngOnInit(): void {
    super.ngOnInit();
    this.ddsInitializer = `Tabs`;
  }
}
