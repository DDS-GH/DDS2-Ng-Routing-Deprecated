import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export const toState = {
  init: "init",
  closed: "closed",
  altClosed: "altclosed",
  open: "open"
};

@Injectable({
  providedIn: "root"
})
export class MenuService {
  private menuState = new BehaviorSubject(toState.init);
  currentState = this.menuState.asObservable();

  changeState(message: any) {
    this.menuState.next(message);
  }
}
