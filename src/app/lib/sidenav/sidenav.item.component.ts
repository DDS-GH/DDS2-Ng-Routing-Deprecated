import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  setElementId,
  stringToBoolean,
  hasChanges,
  ddsIcon,
  ddsLink,
} from '../helpers/dds.helpers';

@Component({
  selector: `dds-sidenav-item`,
  templateUrl: `./sidenav.item.component.html`,
  styleUrls: [`./sidenav.item.component.scss`],
})
export class SidenavItemComponent implements OnChanges {
  @Input() elementId: string;
  @Input() link: string;
  @Input() icon: string;
  @Input() selected: any = false;
  @Input() disabled: any = false;
  public isMissingUl: any = false; // not working. I don't remember what this meant, now either

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.selected = stringToBoolean(this.selected);
    this.disabled = stringToBoolean(this.disabled);
    const parentEl = this.elRef.nativeElement.parentElement;
    if (parentEl) {
      this.isMissingUl = parentEl.nodeName.toLowerCase() === `ul`;
    }

    this.elementId = setElementId(this.elementId);
    this.link = ddsLink(this.link);
    this.icon = ddsIcon(this.icon);
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (hasChanges(changes[`selected`])) {
  //     this.isSelected = stringToBoolean(this.selected);
  //   }
  // }
}
