import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { TabsComponent } from "./tabs.component";
import { TabComponent } from "./tab.component";
import { TabPaneComponent } from "./tab-pane.component";

@NgModule({
  declarations: [TabsComponent, TabComponent, TabPaneComponent],
  imports: [CommonModule],
  exports: [TabsComponent, TabComponent, TabPaneComponent]
})
// @ts-ignore
export class TabsModule {}
