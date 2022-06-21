import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { ButtonComponent } from "src/app/lib/button/button.component";
import { Uuid } from "src/app/lib/helpers/dds.helpers";
import { TooltipComponent } from "src/app/lib/tooltip/tooltip.component";
import { randomNumber } from "src/app/utilities/mock";

declare const DDS: any; // Use declare if you import via CDN. Regular Angular (node_modules) usage would be via an import

@Component({
  templateUrl: "./table.page.html",
  styleUrls: ["./table.page.scss"]
})
export class TablePageComponent implements AfterViewInit {
  @ViewChild(`myTable`) myTable!: ElementRef<HTMLElement>;
  public classList: string = ``;
  public sorting: string = `descending`;
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
    data: [
      [
        { value: `Cluck<span class="dds__d-none rowId">${Uuid()}</span>` },
        { value: `Cluck` },
        { value: `Cluck` }
      ],
      [
        { value: `Bock<span class="dds__d-none rowId">${Uuid()}</span>` },
        { value: `Bock` },
        { value: `Bock` }
      ],
      [
        { value: `Quack<span class="dds__d-none rowId">${Uuid()}</span>` },
        { value: `Quack` },
        { value: `Quack` }
      ]
    ]
  };
  private tooltip: any = {};
  private selectedIndex?: string = undefined;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private applicationRef: ApplicationRef,
    private factoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngAfterViewInit(): void {
    this.initializeTooltips();
  }

  handleAdd(e: any) {
    const num: number = Uuid();
    const buttonData: any = {
      id: `trbutton${num}`,
      content: `Squeak`
    };
    const ttData: any = {
      id: `tt${num}`,
      title: `Cock-a-Doodle-doo`,
      content: `I used to run a dating service for chickens, but I was struggling to make hens meet.`
    };
    this.config.data.push([
      { value: `Quack ${num}<span class="dds__d-none rowId">${num}</span>` },
      {
        value: `Moo? <buttonhold id="${ttData.id}">${buttonData.content}</buttonhold>`
      },
      {
        value: `Joke? <tthold id="${ttData.id}" title="${ttData.title}">${ttData.content}</tthold>`
      }
    ]);
    this.reinitializeTable();
  }

  handleDelete(e: any) {
    if (this.config.data.length > 1) {
      this.config.data.pop();
      this.reinitializeTable();
    } else {
      alert(`Can't delete last row`);
    }
  }

  reinitializeTable() {
    // @ts-ignore
    this.myTable.ddsElement.innerHTML = ``;
    // @ts-ignore
    this.myTable.ddsComponent.dispose();
    // @ts-ignore
    this.myTable.initializeNow();
    this.initializeButtons();
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
    if (this.classList.indexOf(`sticky`) > 0) {
      this.classList = ``;
    } else {
      this.classList = `dds__table--sticky-header custom-height`;
    }
  }

  initializeButtons() {
    // make sure the components you wish to create instances of are in your module's entryComponents
    // make sure your constructor defines the references (see this class's constructor)
    const el = this.viewContainerRef.element.nativeElement as HTMLElement;
    const placeholders = el.querySelectorAll("buttonhold");
    placeholders.forEach((ph) => {
      // 1 Find a component factory
      const componentFactory = this.factoryResolver.resolveComponentFactory(
        ButtonComponent
      );
      // move the placeholder HTML to a new node
      var thisNode = document.createElement("span");
      thisNode.innerHTML = ph.innerHTML;
      // 2 create and initialize a component reference
      const componentRef = componentFactory.create(this.injector, [[thisNode]]);
      componentRef.instance.elementId = ph.id;
      componentRef.instance.classList = `dds__button--mini dds__button--destructive`; // this is the custom property "classList"
      // 3 attach component to applicationRef so angular virtual DOM will
      // understand it as dirty (requires re-rendering)
      this.applicationRef.attachView(componentRef.hostView);
      // 4 let`s do som preparation, get from the component created
      // a view REF
      const viewRef = componentRef.hostView as EmbeddedViewRef<any>;
      // and from view REF the HTML content...
      const viewEl = viewRef.rootNodes[0] as HTMLElement;
      viewEl.addEventListener(`click`, this.handleRowButtonClick);
      const phParent = ph.parentElement;
      if (phParent) {
        phParent.appendChild(viewEl);
      }
      ph.remove();
    });
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

  handleRowButtonClick(e: any) {
    console.log(e.target);
  }
}
