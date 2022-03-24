import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from "@angular/core";
import {
  setElementId,
  stringToBoolean,
  hasChanges,
  ddsIcon,
  ddsLink
} from "../helpers/dds.helpers";
import { MenuService, toState } from "./menu.service";
import { Subscription } from "rxjs";

@Component({
  selector: `dds-actionmenu-item`,
  templateUrl: `./actionmenu.item.component.html`,
  styleUrls: [`./actionmenu.item.component.scss`]
})
export class ActionMenuItemComponent implements OnChanges, OnInit, OnDestroy {
  @Input() id: string;
  @Input() selected: string;
  @Input() link: string;
  @Input() icon: string;
  @Input() checkbox: boolean = false;
  @Input() checked: boolean = false;
  @Input() value: any = "";
  @Output() onChecked: EventEmitter<string> = new EventEmitter<string>();
  public isSelected: boolean;
  private menuService: MenuService;
  private parentId: string;
  message: any;
  subscription: Subscription;

  constructor(private menuState: MenuService) {}

  ngOnInit() {
    this.id = setElementId(this.id);
    this.isSelected = stringToBoolean(this.selected);
    this.link = ddsLink(this.link);
    this.icon = ddsIcon(this.icon);
    this.subscription = this.menuState.currentState.subscribe((message) => {
      this.message = message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (hasChanges(changes.selected)) {
      this.isSelected = stringToBoolean(this.selected);
    }
  }

  public onClick() {
    this.menuState.changeState(toState.closed);
    this.onChecked.emit(this.value);
  }

  public onChange() {
    this.menuState.changeState(toState.altClosed);
    this.onChecked.emit(this.value);
  }
}
