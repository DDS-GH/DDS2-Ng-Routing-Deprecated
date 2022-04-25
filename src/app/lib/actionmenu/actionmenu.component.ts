import {
  Component,
  OnDestroy,
  OnInit,
  HostListener,
  ElementRef,
  Input,
} from '@angular/core';
import { DdsComponent } from '../helpers/dds.component';
import { MenuService, toState } from './menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: `dds-actionmenu`,
  templateUrl: `./actionmenu.component.html`,
  styleUrls: [`./actionmenu.component.scss`],
})
export class ActionMenuComponent
  extends DdsComponent
  implements OnInit, OnDestroy
{
  @Input() button: string = ``;
  private menuService!: MenuService;
  private subscription!: Subscription;

  constructor(private eRef: ElementRef, private menuState: MenuService) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.ddsInitializer = `ActionMenu`;
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
          break;
        case toState.open:
          break;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  open = () => {
    if (this.ddsComponent) this.ddsComponent.open();
  };

  close = () => {
    if (this.ddsComponent) this.ddsComponent.close();
  };
}
