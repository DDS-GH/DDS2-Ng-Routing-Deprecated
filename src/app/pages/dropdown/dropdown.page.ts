import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "./dropdown.page.html"
})
export class DropdownPageComponent implements OnInit {
  public dropdownData: any = {
    stored: [],
    groups: [
      {
        hidden: false,
        options: [
          {
            name: "Alpha Item 0",
            value: "0",
            selected: false
          },
          {
            name: "Not Shown Item 0",
            value: "1",
            selected: false,
            hidden: true
          },
          {
            name: "Alpha Item 1",
            value: "2",
            selected: false
          },
          {
            name: "Not Shown Item 1",
            value: "3",
            selected: false,
            hidden: true
          },
          {
            name: "Alpha Item 2",
            value: "4",
            selected: false
          }
        ]
      },
      {
        name: "Other Stuff",
        options: [
          {
            name: "Beta Item 0",
            value: "5",
            selected: false
          },
          {
            name: "Beta Item 1",
            value: "6",
            selected: false
          },
          {
            name: "Beta Item 2",
            value: "7",
            selected: false
          }
        ]
      }
    ]
  };
  public showTags: boolean = false;

  // @ts-ignore
  ngOnInit(): void {
    this.dropdownData.groups = JSON.stringify(this.dropdownData.groups);
  }
}
