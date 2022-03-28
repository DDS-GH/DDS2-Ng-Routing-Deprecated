import {
  Component,
  OnDestroy,
  OnInit,
  HostListener,
  ElementRef,
  Input,
} from '@angular/core';
import { DdsComponent } from '../helpers/dds.component';
import { ddsIcon } from '../helpers/dds.helpers';
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
  @Input() button: string;
  @Input() alignment: 'start' | 'end' = 'start';
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
      alignment: this.alignment,
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
