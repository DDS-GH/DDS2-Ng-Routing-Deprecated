import { Component, Input, OnInit } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { parseData } from "../helpers/dds.helpers";

@Component({
    selector: `dds-breadcrumb`,
    templateUrl: `./breadcrumb.component.html`,
    styleUrls: [`./breadcrumb.component.scss`],
})
export class BreadcrumbComponent extends DdsComponent implements OnInit {
    @Input() icon: string = `home`;
    @Input() data: any;
    @Input() show: any = true;
    public items: Array<any> = [];

    override ngOnInit() {
        super.ngOnInit();
        this.ddsInitializer = `Breadcrumb`;
        Object.entries(this.data).forEach((val: Array<any>) => {
            if (val[1][`link`] && val[1][`name`]) {
                this.items.push({
                    link: val[1][`link`],
                    name: val[1][`name`],
                });
            }
        })
    }
}
