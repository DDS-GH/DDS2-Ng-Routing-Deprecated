import {
  Component,
  OnInit,
  ContentChildren,
  QueryList,
  Input
} from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { stringToBoolean } from "../helpers/dds.helpers";
import { AccordionItem } from "./directives/accordion-item.directive";

@Component({
  selector: "dds-accordion",
  templateUrl: "./accordion.component.html"
})
export class AccordionComponent extends DdsComponent implements OnInit {
  @ContentChildren(AccordionItem) items!: QueryList<AccordionItem>;
  @Input() controls: any = `false`;
  @Input() independent: any = `false`;
  @Input() texts: any = {
    itemCollapsed: `item collapsed`,
    itemExpanded: `item expanded`,
    itemsCollapsed: `items collapsed`,
    itemsExpanded: `items expanded`,
    expandAll: `Expand All`,
    collapseAll: `Collapse All`
  };
  

  override ngOnInit(): void {
    super.ngOnInit();
    this.ddsInitializer = `Accordion`;
    this.controls = stringToBoolean(this.controls);
    this.independent = stringToBoolean(this.independent);
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

}
