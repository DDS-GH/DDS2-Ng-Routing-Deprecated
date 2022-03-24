import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ActionMenuComponent } from "./actionmenu.component";
import { ActionMenuItemComponent } from "./actionmenu.item.component";
import { ActionMenuMenuComponent } from "./actionmenu.menu.component";

@NgModule({
  declarations: [
    ActionMenuComponent,
    ActionMenuItemComponent,
    ActionMenuMenuComponent
  ],
  imports: [CommonModule],
  exports: [
    ActionMenuComponent,
    ActionMenuItemComponent,
    ActionMenuMenuComponent
  ]
})
export class ActionMenuModule {}
