import { Component, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";

@Component({
  selector: `dds-pagination`,
  templateUrl: `./pagination.component.html`
})
export class PaginationComponent extends DdsComponent {
  @Input() pageSizeOptions: Array<number> = [5,10,15];
  @Input() labels: any = {
    next: `Next`,
    of: `of`,
    page: `Page`,
    previous: `Previous`,
    rows: `rows`,
    rowsPerPage: `Rows per page`,
  };

  override ngOnInit(): void {
    super.ngOnInit();
    this.ddsInitializer = `Pagination`;
  }

}
