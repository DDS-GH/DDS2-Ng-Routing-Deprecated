import { Component, Input, ElementRef } from "@angular/core";
import { stringToBoolean, ddsLink } from "../helpers/dds.helpers";

@Component({
  selector: `dds-sidenav-item`,
  templateUrl: `./sidenav.item.component.html`,
  styleUrls: [`./sidenav.item.component.scss`]
})
export class SidenavItemComponent {
  @Input() link: string = ``;
  @Input() icon: string = ``;
  @Input() svg: any = `false`;
  @Input() selected: any = `false`;
  @Input() disabled: any = `false`;
  public isMissingUl: boolean = false; // not working. I don't remember what this meant, now either

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.selected = stringToBoolean(this.selected);
    this.disabled = stringToBoolean(this.disabled);
    this.svg = stringToBoolean(this.svg);
    const parentEl = this.elRef.nativeElement.parentElement;
    if (parentEl) {
      this.isMissingUl = parentEl.nodeName.toLowerCase() === `ul`;
    }

    this.link = ddsLink(this.link);
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (hasChanges(changes[`selected`])) {
  //     this.isSelected = stringToBoolean(this.selected);
  //   }
  // }
}
