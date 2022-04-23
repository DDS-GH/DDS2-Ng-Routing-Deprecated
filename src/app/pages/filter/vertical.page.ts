import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { arrayAdd, arrayRemove } from "../../lib/helpers/dds.helpers";

@Component({
  templateUrl: "./vertical.page.html",
  styleUrls: ["./vertical.page.scss"]
})
export class FilterVerticalPageComponent implements OnInit {
  public showTags: boolean = false;
  public checkbox0: boolean = false;
  public checkbox1: boolean = false;
  public checkbox2: boolean = false;
  public checkbox3: boolean = false;
  public checkbox4: boolean = false;
  public checkbox5: boolean = false;

  // @ts-ignore
  ngOnInit(): void {}

  clearAllFilters() {}

  handleTagClick() {}
}
