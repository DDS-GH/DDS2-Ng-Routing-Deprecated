import { Component } from "@angular/core";

@Component({
  templateUrl: "./table.component.html"
})
export class TablePageComponent {
  public config: any = {
    columns: [
      { value: "Heading 1", sortBy: "descending" },
      { value: "Heading 2" },
      { value: "Heading 3" }
    ],
    data: [
      [{ value: "Row 1" }, { value: "Row 1" }, { value: "Row 1" }],
      [{ value: "Row 2" }, { value: "Row 2" }, { value: "Row 2" }],
      [{ value: "Row 3" }, { value: "Row 3" }, { value: "Row 3" }]
    ]
  };
}
