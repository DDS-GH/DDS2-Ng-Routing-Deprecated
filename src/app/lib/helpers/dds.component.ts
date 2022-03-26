import { Component, AfterViewInit, Input, OnInit } from "@angular/core";
import {
  createObserver,
  pascalDash,
  ObserverDef,
  setElementId
} from "./dds.helpers";

// import { <Component> } from @dds/components;  You would use this if you were using the node module for DDS
declare const DDS: any; // Use declare if you import via CDN. Regular Angular (node_modules) usage would be via an import

@Component({
    template: ``
})
export class DdsComponent implements OnInit, AfterViewInit {
  @Input() elementId: string = ``;
  @Input() init: string = `now`;

  public ddsInitializer: any;
  public ddsOptions: any;
  public ddsElement: any;
  public ddsComponent: any;
  private observers: Array<any> | undefined;

  ngOnInit(): void {
    this.elementId = setElementId(this.elementId);
  }

  ngAfterViewInit() {
    this.ddsElement = document.getElementById(this.elementId);
    this.initialize();
  }

  initialize() {
    if (this.ddsInitializer) {
      if (this.init === `now`) {
        this.initializeNow();
      } else {
        this.initializeLater();
      }
    }
  }

  /*
   * converts the name of the component into its method OR its selector
   */
  parseInitializer = (parm: string) => {
    let rValues = {
      component: ``,
      selector: ``
    };
    if (typeof this.ddsInitializer === `string`) {
      rValues.component = this.ddsInitializer;
      rValues.selector = pascalDash(this.ddsInitializer).toLowerCase();
    } else {
      rValues.component = this.ddsInitializer.component;
      rValues.selector = this.ddsInitializer.selector;
    }
    if (parm === `component`) {
      return rValues.component;
    } else if (rValues.selector.indexOf(`[`) > -1) {
      return rValues.selector;
    } else {
      return `[data-dds="${rValues.selector}"]`;
    }
  };

  initializeNow = () => {
    const ddsCom: string = this.parseInitializer(`component`);
    if (this.ddsElement) {
      if (DDS[ddsCom]) {
        this.ddsComponent = new DDS[ddsCom](this.ddsElement, this.ddsOptions);
      } else {
        console.error(`No such DDS Component, ${ddsCom}`);
      }
    } else {
      console.error(
        `DDS Component "${ddsCom}" not found by elementId "${this.elementId}".`
      );
    }
  };

  initializeLater = () => {
      const ddsCom: string = this.parseInitializer(`component`);
      console.log(`waiting for `, ddsCom);
    // const ddsSel: string = this.parseInitializer(`selector`);
    // console.log(ddsSel);
    const waitForElements: Array<ObserverDef> = [
      {
        selector: `#${this.elementId}`,
        callback: (elem: any): void => {
            console.log(`found `, elem);
          this.ddsComponent = new DDS[ddsCom](elem, this.ddsOptions);
        }
      }
    ];

    if (!this.observers) {
      this.observers = createObserver(waitForElements);
    }
  };
}
