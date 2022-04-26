import { Component, ElementRef, ViewChild } from "@angular/core";
import { randomNumber } from "src/app/utilities/mock";

@Component({
  templateUrl: "./sidenav.page.html",
  styleUrls: ["./sidenav.page.scss"]
})
// @ts-ignore
export class SidenavPageComponent {
  @ViewChild(`pageSidenav`) pageSidenav!: ElementRef<HTMLElement>;
  public isAdmin: boolean = false;
  public isOwner: boolean = false;

  toggleAdmin() {
    this.isAdmin = !this.isAdmin;
  }
  toggleOwner() {
    this.isOwner = !this.isOwner;
  }
  selectItem() {
    // @ts-ignore
    const items = this.pageSidenav.ddsElement.querySelectorAll(
      `.dds__side-nav__item`
    );
    const rnd = randomNumber(0, items.length);
    // @ts-ignore
    this.pageSidenav.ddsComponent.select(items[rnd]);
  }
  toggleSidenav() {
    // @ts-ignore
    this.pageSidenav.ddsComponent.toggle();
  }
}
