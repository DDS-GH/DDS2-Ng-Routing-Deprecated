import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnInit,
    Renderer2,
  } from "@angular/core";
import { stringToBoolean } from "../helpers/dds.helpers";
  
  @Component({
    selector: "dds-accordion-item",
    templateUrl: "./accordion-item.component.html",
  })
  export class AccordionItemComponent implements OnInit, AfterViewInit, AfterContentInit {
      // @Input() accordionId!: string;
      // @Input() hidden = false;
    @Input() id!: string;
    @Input() elementId: string = ``;
    @Input() title: string = ``;
    @Input() disabled: any = false;
    @Input() expanded: any = false;  
  
    private unwrap() {
        // access the DOM. get the element to unwrap
        const el = this.elRef.nativeElement; // app-page
        const parent = this.renderer.parentNode(this.elRef.nativeElement) as HTMLElement; // parent
  
        // move children to parent (everything is moved including comments which angular depends on)
        while (el.firstChild) {
            // this line doesn't work with server-rendering
            this.renderer.appendChild(parent, el.firstChild);
        }
  
        // remove empty element from parent
        // - true to signal that this removed element is a host element
        this.renderer.removeChild(parent, el, true);
    }
    constructor(private renderer: Renderer2, private elRef: ElementRef<HTMLElement>) {}
    ngAfterContentInit(): void {
        ;
    }
    ngAfterViewInit(): void { this.unwrap(); }
  
    ngOnInit(): void { 
        this.disabled = stringToBoolean(this.disabled);
        this.expanded = stringToBoolean(this.expanded);
    }
  }
  