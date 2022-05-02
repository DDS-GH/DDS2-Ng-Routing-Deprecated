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
      { value: `Khakis`, sortBy: this.sorting },
      {
        value: `Cornish <tthold id="ht${Uuid()}" title="Tooltip Title">Tooltip Content</tthold>`
      },
      {
        value: `Peking`
      }
    ],
    data: [
      [{ value: "Cluck" }, { value: "Cluck" }, { value: "Cluck" }],
      [{ value: "Bock" }, { value: "Bock" }, { value: "Bock" }],
      [{ value: "Quack" }, { value: "Quack" }, { value: "Quack" }]
    ]
  };
  private tooltip: any = {};

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
    const ttData: any = {
      id: `tt${num}`,
      title: `Cock-a-Doodle-doo`,
      content: `I used to run a dating service for chickens, but I was struggling to make hens meet.`
    };
    this.config.data.push([
      { value: num },
      { value: num },
      {
        value: `Joke? <tthold id="${ttData.id}" title="${ttData.title}">${ttData.content}</tthold>`
      }
    ]);
    // @ts-ignore
    this.myTable.ddsElement.innerHTML = ``;
    // @ts-ignore
    this.myTable.ddsComponent.dispose();
    // @ts-ignore
    this.myTable.initializeNow();
    this.initializeTooltips();
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
