import { Component } from "@angular/core";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.component.html"
})
export class TabsPageComponent {
  tabsSelect(tabIndex: number) {
    // @ts-ignore
    document.getElementById(`ddsTabs`).Tabs.setActiveTab(tabIndex);
  }
}
