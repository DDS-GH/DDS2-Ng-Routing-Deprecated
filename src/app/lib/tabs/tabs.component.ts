import { Component, ElementRef, ViewChild, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { stringToBoolean } from "../helpers/dds.helpers";

@Component({
  selector: `dds-tabs`,
  templateUrl: `./tabs.component.html`,
  styleUrls: [`./tabs.component.scss`]
})
export class TabsComponent extends DdsComponent {
  @ViewChild("content") content: ElementRef<HTMLElement>;
  @Input() elementId: string;
  @Input() contained: any;
  @Input() labels: any;
  @Input() selected: any;
  @Input() classList: any;

  ngOnInit() {
    super.ngOnInit();
    this.ddsInitializer = `Tabs`;
    this.contained = stringToBoolean(this.contained);
    this.selected = Number(this.selected) - 1;
    this.labels = this.labels.split(`,`);
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    const contentEl = this.content.nativeElement;
    if (contentEl.childNodes.length !== this.labels.length) {
      console.error(
        `Tabs count must equal the number of childNodes within dds-tabs element.`
      );
    } else {
      contentEl.childNodes.forEach((div: HTMLElement, t: number) => {
        const thisTabId = `#${this.elementId}-${t}`;
        const thisTab = this.ddsElement.querySelector(thisTabId);
        const thisPane = this.ddsElement.querySelector(thisTabId + `-pane`);
        const label = div.getAttribute(`name`);
        const icon = div.getAttribute(`icon`);
        const image = div.getAttribute(`image`);
        // okay, so some DOM manipulation here, but this is open to suggestions
        if (icon) {
          const newIcon = document.createElement(`i`);
          newIcon.className = `dds__icon dds__icon--${icon} dds__tabs__tab__icon dds__tabs__tab__icon--start`;
          thisTab.prepend(newIcon);
        } else if (image) {
          const newSpan = document.createElement(`span`);
          const newImg = document.createElement(`img`);
          newSpan.className = `dds__tabs__tab__image`;
          newImg.setAttribute(`alt`, label);
          newImg.setAttribute(`src`, image);
          newSpan.appendChild(newImg);
          thisTab.prepend(newSpan);
          thisTab.classList.add(`dds__tabs__tab--with-image`);
        }
        thisPane.innerHTML = div.innerHTML;
      });
    }
  }
}
