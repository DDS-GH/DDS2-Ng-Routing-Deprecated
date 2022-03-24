import {
  Component,
  OnDestroy,
  OnInit,
  HostListener,
  ElementRef,
  Input
} from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { ddsIcon } from "../helpers/dds.helpers";
import { MenuService, toState } from "./menu.service";
import { Subscription } from "rxjs";

@Component({
  selector: `dds-actionmenu`,
  templateUrl: `./actionmenu.component.html`,
  styleUrls: [`./actionmenu.component.scss`]
})
export class ActionMenuComponent extends DdsComponent
  implements OnInit, OnDestroy {
  @Input() button: string;
  @Input() alignment: "start" | "end" = "start";
  private menuService: MenuService;
  private subscription: Subscription;
  private wasInside: boolean = false;
  private chevron: string;

  constructor(private eRef: ElementRef, private menuState: MenuService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.ddsInitializer = `ActionMenu`;
    this.ddsOptions = {
      alignment: this.alignment
    };
    this.subscription = this.menuState.currentState.subscribe((message) => {
      switch (message) {
        case toState.closed:
          this.close();
          setTimeout(() => {
            this.menuState.changeState(toState.init);
          });
          break;
        case toState.altClosed:
          setTimeout(() => {
            this.menuState.changeState(toState.init);
          });
          break;
        case toState.init:
          this.chevron = ddsIcon(`chevron-up`);
          break;
        case toState.open:
          this.chevron = ddsIcon(`chevron-up`); // this is weird because HostListener toggles it again
          break;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener("click")
  clickInside() {
    this.wasInside = true;
    if (this.chevron.match(/down/g)) {
      this.chevron = ddsIcon(`chevron-up`);
    } else {
      this.chevron = ddsIcon(`chevron-down`);
    }
  }

  @HostListener("document:click")
  clickout() {
    if (!this.wasInside) {
      this.close();
      this.chevron = ddsIcon(`chevron-up`);
      this.menuState.changeState(toState.altClosed);
    }
    this.wasInside = false;
  }

  open = () => {
    if (this.ddsComponent) this.ddsComponent.open();
  };

  close = () => {
    if (this.ddsComponent) this.ddsComponent.close();
  };
}
