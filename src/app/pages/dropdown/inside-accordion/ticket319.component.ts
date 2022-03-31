import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import * as data from "./ticket319.component.json";

@Component({
  templateUrl: "./ticket319.component.html"
})
export class Ticket319Component implements AfterViewInit {
  @ViewChild("ddAccordion") ddAccordion: ElementRef<HTMLElement> | undefined;
  public dropdata: JSON = data;

  // @ts-ignore
  ngAfterViewInit(): void {
    // @ts-ignore
    this.ddAccordion.ddsElement.addEventListener(
      `ddsAccordionExpandedEvent`,
      (e: any) => {
        e.target.querySelector(
          ".dds__accordion__content"
        ).style.overflow = `visible`;
      }
    );
    // @ts-ignore
    this.ddAccordion.ddsElement.addEventListener(
      `ddsAccordionCollapsingEvent`,
      (e: any) => {
        e.target.querySelector(
          ".dds__accordion__content"
        ).style.overflow = `hidden`;
      }
    );
  }
}
