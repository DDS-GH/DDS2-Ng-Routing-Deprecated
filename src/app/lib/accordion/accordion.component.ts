import {
  Component,
  OnInit,
  ContentChildren,
  QueryList,
  Input
} from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { AccordionItem } from "./directives/accordion-item.directive";

@Component({
  selector: "dds-accordion",
  templateUrl: "./accordion.component.html"
})
export class AccordionComponent extends DdsComponent implements OnInit {
  @ContentChildren(AccordionItem) items: QueryList<AccordionItem> | undefined;
  @Input() controls: any = `false`;
  @Input() texts: any = {
    itemCollapsed: `item collapsed`,
    itemExpanded: `item expanded`,
    itemsCollapsed: `items collapsed`,
    itemsExpanded: `items expanded`,
    expandAll: `Expand All`,
    collapseAll: `Collapse All`
  };

  // @ts-ignore
  ngOnInit(): void {
    super.ngOnInit();
    this.ddsInitializer = `Accordion`;
  }
}
