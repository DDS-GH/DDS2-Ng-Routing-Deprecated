import { Component, Input, OnInit } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { parseData } from "../helpers/dds.helpers";

@Component({
  selector: `dds-breadcrumb`,
  templateUrl: `./breadcrumb.component.html`,
  styleUrls: [`./breadcrumb.component.scss`]
})
export class BreadcrumbComponent extends DdsComponent implements OnInit {
  @Input() elementId: string;
  @Input() icon: string = `home`;
  @Input() data: any;
  public items: Array<any> = [];

  ngOnInit() {
    super.ngOnInit();
    this.ddsInitializer = `Breadcrumb`;
    if (this.data) {
      this.data = parseData(this.data);
      this.data.forEach((item: any) => {
        this.items.push({
          link: item.href,
          name: item.text
        });
      });
    }
  }
}
