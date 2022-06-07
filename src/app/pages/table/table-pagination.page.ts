import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { Uuid } from "src/app/lib/helpers/dds.helpers";
import { TooltipComponent } from "src/app/lib/tooltip/tooltip.component";
import { randomNumber } from "src/app/utilities/mock";
import { debug } from "src/app/utilities/util";

declare const DDS: any; // Use declare if you import via CDN. Regular Angular (node_modules) usage would be via an import

@Component({
  templateUrl: "./table-pagination.page.html",
  styleUrls: ["./table-pagination.page.scss"]
})
export class TablePaginationPageComponent implements OnInit, AfterViewInit {
  @ViewChild(`myTable`) myTable!: ElementRef<HTMLElement>;
  @ViewChild(`paginationRef`) paginationRef!: ElementRef<HTMLElement>;
  public classList: string = `dds__table--compact`;
  public sorting: string = `descending`;
  public pool: any = {
    data: [],
    page: {
      current: 0,
      size: 6
    }
  };
  public config: any = {
    columns: [
      {
        value: `Khakis`,
        sortBy: this.sorting
      },
      {
        value: `Cornish <tthold id="ht${Uuid()}" title="Tooltip Title">Tooltip Content</tthold>`
      },
      {
        value: `Peking`
      }
    ],
    data: this.refinePool()
  };
  private tooltip: any = {};
  private selectedIndex?: string = undefined;
  public pagination: any = {
    perPageSelected: this.pool.page.size,
    perPageOptions: [6, 12, 24],
    options: {
      currentPage: this.pool.page.current,
      totalItems: this.pool.page.size
    }
  };

  constructor(
    private viewContainerRef: ViewContainerRef,
    private applicationRef: ApplicationRef,
    private factoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.handleAdd(48);
    this.initializeTooltips();
    const linkPool = (e: any) => {
      this.pool.page.current = e.detail.currentPage - 1;
      this.pool.page.size = e.detail.pageSize;
      this.reinitializeTable();
    };
    this.paginationRef.ddsElement.addEventListener(
      `ddsPaginationPageChangedEvent`,
      linkPool
    );
    this.paginationRef.ddsElement.addEventListener(
      `ddsPaginationPageSizeChangedEvent`,
      linkPool
    );
  }

  handleAdd(e: number = 1) {
    for (let i = 0; i < e; i++) {
      const num: number = Uuid();
      const ttData: any = {
        id: `tt${num}`,
        title: `Cock-a-Doodle-doo`,
        content: `I used to run a dating service for chickens, but I was struggling to make hens meet.`
      };
      this.pool.data.push([
        { value: `Quack ${num}<span class="dds__d-none rowId">${num}</span>` },
        { value: `Moo?` },
        {
          value: `Joke? <tthold id="${ttData.id}" title="${ttData.title}">${ttData.content}</tthold>`
        }
      ]);
    }
    this.paginationRef.ddsComponent.setTotalItems(this.pool.data.length);
    this.reinitializeTable();
  }

  reinitializeTable() {
    this.config.data = this.refinePool();
    this.myTable.ddsElement.innerHTML = ``;
    if (this.myTable.ddsComponent.dispose) {
      this.myTable.ddsComponent.dispose();
    }
    this.myTable.initializeNow();
    this.initializeTooltips();
  }

  handleSelect(e: any) {
    const tableRows = this.myTable.ddsElement.querySelectorAll(`.dds__tr`);
    const randIndx = randomNumber(0, tableRows.length);
    const selectedRow = tableRows[randIndx];

    // remove classes indicating selection
    this.myTable.ddsElement
      .querySelectorAll(`.selectedRow`)
      .forEach((r: any) => {
        r.classList.remove(`selectedRow`);
      });

    // select new random row, store its hidden ID at root
    if (selectedRow.querySelector(`.rowId`)) {
      this.selectedIndex = selectedRow.querySelector(`.rowId`).innerText;
    }

    // add selection classes
    selectedRow.querySelectorAll(`.dds__td`).forEach((c: any) => {
      c.classList.add(`selectedRow`);
    });
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
    this.initializeTooltips();
  }

  handleSticky(e: any) {
    const sClass = ` dds__table--sticky-header custom-height`;
    if (this.classList.indexOf(sClass) > 0) {
      this.classList = this.classList.replace(sClass, ``);
    } else {
      this.classList = this.classList + sClass;
    }
  }

  refinePool() {
    const length = this.pool.data.length;
    const size = this.pool.page.size;
    const page = this.pool.page.current;
    let localSize = size;
    if (length === 0) {
      return [];
    }
    if (length < page * size) {
      localSize = length;
    } else if (length < page * size + size) {
      localSize = length;
    }
    return this.pool.data.slice(page * size, page * size + localSize);
  }

  initializeTooltips() {
    // make sure the components you wish to create instances of are in your module's entryComponents
    // make sure your constructor defines the references (see this class's constructor)
    const el = this.viewContainerRef.element.nativeElement as HTMLElement;
    const placeholders = el.querySelectorAll("tthold");
    placeholders.forEach((ph) => {
      // 1 Find a component factory
      const componentFactory = this.factoryResolver.resolveComponentFactory(
        TooltipComponent
      );
      // 2 create and initialize a component reference
      const componentRef = componentFactory.create(this.injector);
      componentRef.instance.elementId = ph.id;
      componentRef.instance.title = ph.getAttribute(`title`) || ``;
      componentRef.instance.content = ph.innerHTML;
      // 3 attach component to applicationRef so angular virtual DOM will
      // understand it as dirty (requires re-rendering)
      this.applicationRef.attachView(componentRef.hostView);
      // 4 let`s do som preparation, get from the component created
      // a view REF
      const viewRef = componentRef.hostView as EmbeddedViewRef<any>;
      // and from view REF the HTML content...
      const viewEl = viewRef.rootNodes[0] as HTMLElement;
      const phParent = ph.parentElement;
      if (phParent) {
        phParent.appendChild(viewEl);
      }
      ph.remove();
    });
  }
}
