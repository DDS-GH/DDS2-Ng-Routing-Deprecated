import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SidenavComponent } from "./sidenav.component";
import { SidenavItemComponent } from "./sidenav.item.component";
import { SidenavMenuComponent } from "./sidenav.menu.component";

@NgModule({
  declarations: [SidenavComponent, SidenavItemComponent, SidenavMenuComponent],
  imports: [CommonModule],
  exports: [SidenavComponent, SidenavItemComponent, SidenavMenuComponent]
})
export class SidenavModule {}
