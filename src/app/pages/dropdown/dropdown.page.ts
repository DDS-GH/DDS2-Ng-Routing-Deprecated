import { Component, OnInit } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import * as data from "./dropdown.page.json";

interface DGroups {
  name: string;
  hidden: boolean;
  stored: Array<any>;
  options: Array<any>;
}

@Component({
  templateUrl: "./dropdown.page.html"
})
export class DropdownPageComponent implements OnInit {
  public stored: Array<any> = [];
  public showTags: boolean = false;
  public groups: Observable<DGroups>[] = [];
  public groupsArray: DGroups[] = [];
  public groups$: BehaviorSubject<Array<DGroups>> = new BehaviorSubject<
    Array<DGroups>
  >(this.groupsArray);

  ngOnInit(): void {
    // this.groups = of(data);
    data.forEach((d: any) => {
      this.groups.push(of(d));
      this.groupsArray.push(d);
      this.groups$.next(this.groupsArray);
    });
  }

  handleToggle(e: any) {
    this.groupsArray[0].options[1].hidden = !this.groupsArray[0].options[1]
      .hidden;
  }
}
