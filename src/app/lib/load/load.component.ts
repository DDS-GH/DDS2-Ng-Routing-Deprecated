import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { setElementId } from "../helpers/dds.helpers";

@Component({
  selector: `dds-load`,
  templateUrl: `./load.component.html`,
  styleUrls: [`./load.component.scss`]
})
export class LoadComponent implements OnInit {
  @ViewChild(`globalLoader`) globalLoader!: ElementRef<HTMLElement>;
  @Input() classList: string = ``;
  @Input() elementId: string = ``;
  @Input() label: string = `Loading`;
  @Input() mode: string = `inline`;
  @Input() placement: string = `top`;
  @Input() size: string = `sm`;
  public stateOn: boolean = true;

  ngOnInit() {
    if (this.mode !== `inline`) {
      this.stateOn = false;
    }
    this.elementId = setElementId(this.elementId);
    if (this.size) {
      switch (this.size) {
        case `small`:
          this.size = `sm`;
          break;
        case `medium`:
          this.size = `md`;
          break;
        case `large`:
          this.size = `lg`;
          break;
        case `extra large`:
          this.size = `xl`;
          break;
      }
      this.classList += ` dds__loading-indicator--${this.size}`;
    }
    if (this.placement) {
      this.classList += ` dds__loading-indicator--label-${this.placement}`;
    }
  }

  open() {
    this.stateOn = true;
  }
  close() {
    this.stateOn = false;
  }
  toggle() {
    if (this.mode !== `inline`) {
      if (this.stateOn) {
        this.globalLoader.ddsComponent.open();
      } else {
        this.globalLoader.ddsComponent.close();
      }
    }
    this.stateOn = !this.stateOn;
  }
}
