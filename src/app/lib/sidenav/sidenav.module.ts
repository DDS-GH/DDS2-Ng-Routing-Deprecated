import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SidenavComponent } from "./sidenav.component";
import { SidenavItemComponent } from "./sidenav.item.component";
import { SidenavMenuComponent } from "./sidenav.menu.component";

@NgModule({
  declarations: [SidenavComponent, SidenavItemComponent, SidenavMenuComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidenavComponent, SidenavItemComponent, SidenavMenuComponent]
})
export class SidenavModule {}
