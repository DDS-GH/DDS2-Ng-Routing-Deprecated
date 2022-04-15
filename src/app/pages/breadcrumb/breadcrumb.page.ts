import { Component, OnInit } from "@angular/core";
import * as data from "./breadcrumb.page.json";

@Component({
  templateUrl: "./breadcrumb.page.html"
})
export class BreadcrumbPageComponent implements OnInit {
  public bcData!: any;

  // @ts-ignore
  ngOnInit(): void {
    this.bcData = data;
  }
}
