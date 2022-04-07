import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  templateUrl: "./tabs.page.html"
})
export class TabsPageComponent {
  @ViewChild("catTabs") catTabs: ElementRef<HTMLElement>;

  tabsSelect(tabIndex: number) {
    this.catTabs.ddsComponent.setActiveTab(tabIndex);
    // this also works: document.getElementById(`kittyTabs`).Tabs.setActiveTab(tabIndex);
  }
}
