import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";

@Component({
  selector: `dds-table`,
  templateUrl: `./table.component.html`,
  styleUrls: [`./table.component.scss`]
})
export class TableComponent extends DdsComponent implements OnChanges {
  @Output() onSort: EventEmitter<any> = new EventEmitter<any>();

  override ngOnInit(): void {
    super.ngOnInit();
    this.ddsInitializer = `Table`;
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.ddsElement.addEventListener(`ddsTableSortEvent`, (e: any) => {
      this.onSort.emit(e.detail);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[`config`] && changes[`config`].firstChange) {
      return;
    }
  }
}
