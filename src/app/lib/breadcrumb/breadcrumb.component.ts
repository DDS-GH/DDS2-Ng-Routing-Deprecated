import { Component, Input, OnInit } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { parseData } from "../helpers/dds.helpers";

@Component({
  selector: `dds-breadcrumb`,
  templateUrl: `./breadcrumb.component.html`,
  styleUrls: [`./breadcrumb.component.scss`]
})
export class BreadcrumbComponent extends DdsComponent implements OnInit {
  @Input() icon: string = `home`;
  @Input() data: any;
  @Input() show: boolean = true;
  public items: Array<any> = [];

  ngOnInit() {
    super.ngOnInit();
    this.ddsInitializer = `Breadcrumb`;
    for (let [key, value] of Object.entries(this.data)) {
      this.items.push({
        link: value["link"],
        name: value["name"]
      });
    }
  }
}
