import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2
} from "@angular/core";

@Component({
  selector: "dds-tab",
  templateUrl: "./tab.component.html"
})
export class TabComponent implements AfterViewInit {
  @Input() id!: string;
  @Input() paneId!: string;
  @Input() index = 0;
  @Input() title = "Title";
  @Input() icon!: string;
  @Input() image!: string;
  @Input() selected = false;

  private unwrap() {
    // access the DOM. get the element to unwrap
    const el = this.elRef.nativeElement; // app-page
    const parent = this.renderer.parentNode(
      this.elRef.nativeElement
    ) as HTMLElement; // parent

    // move children to parent (everything is moved including comments which angular depends on)
    while (el.firstChild) {
      // this line doesn't work with server-rendering
      this.renderer.appendChild(parent, el.firstChild);
    }

    // remove empty element from parent
    // - true to signal that this removed element is a host element
    this.renderer.removeChild(parent, el, true);
  }

  get tabIconClasses(): string {
    const cls = [
      "dds__icon",
      "dds__tabs__tab__icon",
      "dds__tabs__tab__icon--start"
    ];
    if (this.icon) cls.push(`dds__icon--${this.icon}`);
    return cls.join(" ");
  }
  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef<HTMLElement>
  ) {}
  ngAfterViewInit(): void {
    this.unwrap();
  }
}
