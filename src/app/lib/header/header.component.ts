import { Component, Input, OnInit, HostListener, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { setElementId } from "../helpers/dds.helpers";

@Component({
  selector: `app-header`,
  templateUrl: `./header.component.html`,
  styleUrls: [`./header.component.scss`]
})
// @ts-ignore
export class HeaderComponent implements OnInit {
  @Input() elementId: string = ``;
  @Input() classList: string = ``;
  navFixed: boolean = false;
  private scrollOffset: number = 70;

  constructor(@Inject(DOCUMENT) document) {}

  @HostListener("window:scroll")
  // @ts-ignore
  onWindowScroll() {
    this.navFixed =
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0) > this.scrollOffset;
  }

  ngOnInit() {
    this.elementId = setElementId(this.elementId);
  }
}
