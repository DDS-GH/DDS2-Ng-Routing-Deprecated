import { Component, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";

@Component({
  selector: `dds-table`,
  templateUrl: `./table.component.html`,
  styleUrls: [`./table.component.scss`]
})
export class TableComponent extends DdsComponent {
  @Input() config: any = ``;

  // @ts-ignore
  ngOnInit(): void {
    super.ngOnInit();
    this.ddsInitializer = `Table`;
    this.ddsOptions = this.config;
  }
}
