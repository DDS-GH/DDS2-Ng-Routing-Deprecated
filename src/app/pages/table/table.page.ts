import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { Uuid } from "src/app/lib/helpers/dds.helpers";

declare const DDS: any; // Use declare if you import via CDN. Regular Angular (node_modules) usage would be via an import

@Component({
  templateUrl: "./table.page.html"
})
export class TablePageComponent implements AfterViewInit {
  @ViewChild(`myTable`) myTable!: ElementRef<HTMLElement>;
  private tooltipInstance: any | undefined;

  public sorting: string = `descending`;
  public config: any = {
    columns: [
      { value: "Heading 1", sortBy: this.sorting },
      { value: "Heading 2" },
      {
        value: `Heading 3${this.getUnwrappedTooltip(
          `newTooltip`,
          `Dad Joke`,
          `We’re renovating the house, and the first floor is going great, but the second floor is another story.`
        )}`
      }
    ],
    data: [
      [{ value: "Row 1" }, { value: "Row 1" }, { value: "Row 1" }],
      [{ value: "Row 2" }, { value: "Row 2" }, { value: "Row 2" }],
      [{ value: "Row 3" }, { value: "Row 3" }, { value: "Row 3" }]
    ]
  };

  ngAfterViewInit(): void {
    this.initializeTooltip();
  }

  handleAdd(e: any) {
    const num = Uuid();
    this.config.data.push([{ value: num }, { value: num }, { value: num }]);
    // @ts-ignore
    this.myTable.ddsElement.innerHTML = ``;
    // @ts-ignore
    this.myTable.ddsComponent.dispose();
    // @ts-ignore
    this.myTable.initializeNow();
    this.initializeTooltip();
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
      // @ts-ignore
      this.myTable.ddsComponent.sort(0, this.sorting);
    } else {
      this.sorting = e.sortBy;
    }
  }

  initializeTooltip() {
    setTimeout(() => {
      this.tooltipInstance = new DDS.Tooltip(
        document.getElementById(`newTooltip`)
      );
    });
  }

  getUnwrappedTooltip(newId: string, title: string, content: string) {
    return `
      <a href="javascript:void(0);" id="${newId}Trigger" class="dds__link--standalone" aria-describedby="${newId}">
        <span class="dds__sr-only">tooltip</span>
        <i class="dds__icon dds__icon--alert-info-cir"></i>
      </a>
      <div id="${newId}" data-trigger="#${newId}Trigger" data-dds="tooltip" class="dds__tooltip" role="tooltip">
        <div class="dds__tooltip__body">
          <h6 class="dds__tooltip__title">${title}</h6>
          ${content}
        </div>
      </div>
  `;
  }
}
