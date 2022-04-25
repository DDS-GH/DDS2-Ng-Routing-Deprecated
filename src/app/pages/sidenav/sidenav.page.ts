import { Component } from "@angular/core";

@Component({
  templateUrl: "./sidenav.page.html",
  styleUrls: ["./sidenav.page.scss"]
})
// @ts-ignore
export class SidenavPageComponent {
  public isAdmin: boolean = false;
  public isOwner: boolean = false;

  toggleAdmin() {
    this.isAdmin = !this.isAdmin;
  }
  toggleOwner() {
    this.isOwner = !this.isOwner;
  }
}
