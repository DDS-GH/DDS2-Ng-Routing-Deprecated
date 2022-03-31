import { Component, OnInit } from "@angular/core";
import * as data from "./breadcrumb.json";

@Component({
  templateUrl: "./breadcrumb.component.html"
})
export class BreadcrumbPageComponent implements OnInit {
  public bcData: JSON;

  // @ts-ignore
  ngOnInit(): void {
    this.bcData = data;
  }
}
