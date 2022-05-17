import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { debug } from "console";

@Component({
  templateUrl: "./popover.page.html"
})
export class PopoverPageComponent implements AfterViewInit {
  @ViewChild(`charlie`) charlie!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    debug({
      charlie: this.charlie,
      ddsComponent: this.charlie.ddsComponent,
      ddsOptions: this.charlie.ddsOptions,
      ddsElement: this.charlie.ddsElement,
      trigger: document.getElementById(`charlie`)
    });
  }
}
