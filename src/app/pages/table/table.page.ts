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
import { Uuid } from "src/app/lib/helpers/dds.helpers";
import { TooltipComponent } from "src/app/lib/tooltip/tooltip.component";

declare const DDS: any; // Use declare if you import via CDN. Regular Angular (node_modules) usage would be via an import

@Component({
  templateUrl: "./table.page.html"
})
export class TablePageComponent implements AfterViewInit {
  @ViewChild(`myTable`) myTable!: ElementRef<HTMLElement>;
  public sorting: string = `descending`;
  public config: any = {
    columns: [
      { value: `Heading 1`, sortBy: this.sorting },
      { value: `Heading 2` },
      {
        value: `Heading 3`
      }
    ],
    data: [
      [{ value: "Row 1" }, { value: "Row 1" }, { value: "Row 1" }],
      [{ value: "Row 2" }, { value: "Row 2" }, { value: "Row 2" }],
      [{ value: "Row 3" }, { value: "Row 3" }, { value: "Row 3" }]
    ]
  };
  private tooltipInstance: any | undefined;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private applicationRef: ApplicationRef,
    private factoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

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
      // 1 Find a component factory
      const componentFactory = this.factoryResolver.resolveComponentFactory(
        TooltipComponent
      );
      // 2 create and initialize a component reference
      const componentRef = componentFactory.create(this.injector);
      componentRef.instance.title = `Cluck Cluck`;
      componentRef.instance.content = `I used to run a dating service for chickens, but I was struggling to make hens meet.`;
      // 3 attach component to applicationRef so angular virtual DOM will
      // understand it as dirty (requires re-rendering)
      this.applicationRef.attachView(componentRef.hostView);
      // 4 let`s do som preparation, get from the component created
      // a view REF
      const viewRef = componentRef.hostView as EmbeddedViewRef<any>;
      // and from view REF the HTML content...
      const viewEl = viewRef.rootNodes[0] as HTMLElement;
      // 5 now find the position. Since table doesn`t have explicit
      // declaration of rows neiter cols explict, we going to find its
      // location looking for the TABLE itslf (viewContainerRef)
      const el = this.viewContainerRef.element.nativeElement as HTMLElement;
      // from the viewContainerRef, look for headers
      const headers = el.querySelectorAll(".dds__th span");
      // it lacks some positioning, but this is cool, in the second header
      // append the component.
      headers[1].appendChild(viewEl);
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
