import { Component, Input, OnInit } from "@angular/core";
import { setElementId } from "../helpers/dds.helpers";

@Component({
  selector: `dds-load`,
  templateUrl: `./load.component.html`
})
export class LoadComponent implements OnInit {
  @Input() elementId: string = ``;
  @Input() classList: string = ``;
  @Input() label: string = `Loading`;
  @Input() size: string = `sm`;
  @Input() position: string = `top`;

  ngOnInit() {
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
    if (this.position) {
      this.classList += ` dds__loading-indicator--label-${this.position}`;
    }
  }
}
