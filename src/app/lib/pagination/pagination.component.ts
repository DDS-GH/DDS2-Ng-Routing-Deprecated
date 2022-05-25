import { Component, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";

@Component({
  selector: `dds-pagination`,
  templateUrl: `./pagination.component.html`
})
export class PaginationComponent extends DdsComponent {
  @Input() perPageOptions: any = [5, 10, 15];
  @Input() perPageSelected: any = 10;
  @Input() labels: any = {
    next: `Next`,
    of: `of`,
    page: `Page`,
    previous: `Previous`,
    items: `items`,
    itemsPerPage: `Items per page`,
  };

  override ngOnInit(): void {
    super.ngOnInit();
    this.ddsInitializer = `Pagination`;
    if (typeof this.perPageOptions === `string`) {
      this.perPageOptions = JSON.parse(this.perPageOptions);
    }
    if (typeof this.perPageSelected === `string`) {
      this.perPageSelected = Number(this.perPageSelected);
    }
  }

}
