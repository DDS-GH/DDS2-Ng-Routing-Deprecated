import { Component, ElementRef, ViewChild } from "@angular/core";
import { Uuid } from "src/app/lib/helpers/dds.helpers";

@Component({
  templateUrl: "./table.page.html"
})
export class TablePageComponent {
  @ViewChild(`myTable`) myTable!: ElementRef<HTMLElement>;

  public sorting: string = `descending`;
  public config: any = {
    columns: [
      { value: "Heading 1", sortBy: this.sorting },
      { value: "Heading 2" },
      { value: "Heading 3" }
    ],
    data: [
      [{ value: "Row 1" }, { value: "Row 1" }, { value: "Row 1" }],
      [{ value: "Row 2" }, { value: "Row 2" }, { value: "Row 2" }],
      [{ value: "Row 3" }, { value: "Row 3" }, { value: "Row 3" }]
    ]
  };

  handleAdd(e: any) {
    const num = Uuid();
    this.config.data.push([{ value: num }, { value: num }, { value: num }]);
    console.log(this.config.data);
  }

  handleSort(e: any) {
    if (typeof e.detail === `number`) {
      switch (this.sorting) {
        case `descending`:
          this.sorting = `ascending`;
          break;
        case `ascending`:
          this.sorting = `unsorted`;
          break;
        case `unsorted`:
          this.sorting = `descending`;
          break;
      }
      this.myTable.ddsComponent.sort(0, this.sorting);
    } else {
      this.sorting = e.sortBy;
    }
  }
}
