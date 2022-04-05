import { Component } from "@angular/core";

@Component({
  templateUrl: "./tabs.page.html"
})
export class TabsPageComponent {
  tabsSelect(tabIndex: number) {
    // @ts-ignore
    document.getElementById(`ddsTabs`).Tabs.setActiveTab(tabIndex);
  }
}
