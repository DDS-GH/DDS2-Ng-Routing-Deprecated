import { Component, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { stringToBoolean, debounce, ddsIcon } from "../helpers/dds.helpers";
import { handleResize } from "../helpers/mediasize";

const icons: any = {
  left: ddsIcon(`chevron-left`),
  right: ddsIcon(`chevron-right`)
};

@Component({
  selector: `dds-sidenav`,
  templateUrl: `./sidenav.component.html`,
  styleUrls: [`./sidenav.component.scss`]
})
export class SidenavComponent extends DdsComponent {
  @Input() fixed: any = `false`;
  @Input() sticky: any = `false`;
  public states: any = {
    open: false
  };
  public stickyIcon: string = icons.left;

  // @ts-ignore
  ngOnInit() {
    super.ngOnInit();
    this.ddsInitializer = `SideNav`;
    this.fixed = stringToBoolean(this.fixed);
    this.ddsOptions = {
      fixed: this.fixed
    };
    this.handleResize();
  }

  // @ts-ignore
  ngAfterViewInit() {
    super.ngAfterViewInit();
    window.addEventListener(
      "resize",
      debounce(() => this.handleResize())
    );
    this.ddsElement.addEventListener(`ddsSideNavCollapsedEvent`, (e: any) => {
      this.stickyIcon = icons.right;
    });
    this.ddsElement.addEventListener(`ddsSideNavExpandedEvent`, (e: any) => {
      this.stickyIcon = icons.left;
    });
  }

  handleResize() {
    const currentSize: string = handleResize();
    this.states.open = currentSize.match(/lg|xl/g) != null;
    if (!this.fixed && this.states.open) {
      this.stickyIcon = icons.left;
    } else {
      this.stickyIcon = icons.right;
    }
  }

  expandSidenav = (e: any) => {
    if (this.ddsComponent) this.ddsComponent.expand();
  };

  collapseSidenav = (e: any) => {
    if (this.ddsComponent) this.ddsComponent.collapse();
  };

  toggle = (e: any) => {
    if (this.ddsComponent) this.ddsComponent.toggle();
  };
}
