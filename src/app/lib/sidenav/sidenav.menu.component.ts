import {
  Component,
  Input,
  ElementRef,
  OnInit,
  AfterViewInit
} from "@angular/core";
import { stringToBoolean } from "../helpers/dds.helpers";

@Component({
  selector: `dds-sidenav-menu`,
  templateUrl: `./sidenav.menu.component.html`,
  styleUrls: [`./sidenav.menu.component.scss`]
})
export class SidenavMenuComponent implements OnInit, AfterViewInit {
  @Input() open: any = `false`;
  @Input() icon: string = ``;
  @Input() name: string = ``;
  @Input() viewbox: string = ``;
  @Input() svg: any = `false`;
  @Input() hidden: any = `false`;

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.open = stringToBoolean(this.open);
    this.svg = stringToBoolean(this.svg);
    this.hidden = stringToBoolean(this.hidden);
  }

  ngAfterViewInit(): void {
    if (this.viewbox) {
      this.elRef.nativeElement
        .querySelector(`svg`)
        .setAttribute(`viewBox`, this.viewbox);
    }
    if (this.open) {
      // this is a hack, but that's because the DDS option API is not exposed yet
      setTimeout(() => {
        this.elRef.nativeElement.querySelector(`li button`).click();
      });
    }
  }
}
