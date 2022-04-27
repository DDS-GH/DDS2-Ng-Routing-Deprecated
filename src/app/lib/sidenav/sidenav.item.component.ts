import {
  Component,
  Input,
  ElementRef,
  OnInit,
  AfterViewInit
} from "@angular/core";
import { stringToBoolean, ddsLink, setElementId } from "../helpers/dds.helpers";

@Component({
  selector: `dds-sidenav-item`,
  templateUrl: `./sidenav.item.component.html`,
  styleUrls: [`./sidenav.item.component.scss`]
})
export class SidenavItemComponent implements OnInit, AfterViewInit {
  @Input() elementId: string = ``;
  @Input() link: string = ``;
  @Input() icon: string = ``;
  @Input() svg: any = `false`;
  @Input() selected: any = `false`;
  @Input() disabled: any = `false`;
  @Input() hidden: any = `false`;
  @Input() viewbox: any = ``;
  @Input() classList: any = ``;
  public isMissingUl: boolean = false; // not working. I don't remember what this meant, now either

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.elementId = setElementId(this.elementId);
    this.selected = stringToBoolean(this.selected);
    this.disabled = stringToBoolean(this.disabled);
    this.hidden = stringToBoolean(this.hidden);
    this.svg = stringToBoolean(this.svg);
    const parentEl = this.elRef.nativeElement.parentElement;
    if (parentEl) {
      this.isMissingUl = parentEl.nodeName.toLowerCase() === `ul`;
    }
    this.link = ddsLink(this.link);
  }

  ngAfterViewInit(): void {
    if (this.viewbox) {
      this.elRef.nativeElement
        .querySelector(`svg`)
        .setAttribute(`viewBox`, this.viewbox);
    }
  }

  handleClick(e: any) {
    if (this.hidden) {
      e.preventDefault();
    } else {
      const alink = e.target.querySelector(`a`);
      if (alink) {
        alink.click();
      }
    }
  }
}
