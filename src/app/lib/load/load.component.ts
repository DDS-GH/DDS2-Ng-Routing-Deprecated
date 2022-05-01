import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { setElementId } from "../helpers/dds.helpers";

@Component({
  selector: `dds-load`,
  templateUrl: `./load.component.html`,
  styleUrls: [`./load.component.scss`]
})
export class LoadComponent implements OnInit, OnChanges {
  @ViewChild(`globalLoader`) globalLoader!: ElementRef<HTMLElement>;
  @ViewChild(`honeypot`) honeypot!: ElementRef<HTMLElement>;
  @Input() classList: string = ``;
  @Input() elementId: string = ``;
  @Input() label: string = `Loading`;
  @Input() mode: string = `inline`;
  @Input() placement: string = `top`;
  @Input() size: string = `sm`;
  public stateOn: boolean = true;

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
    if (this.placement) {
      this.classList += ` dds__loading-indicator--label-${this.placement}`;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes[`mode`]) {
      this.keepStateWithMode();
    }
  }

  keepStateWithMode() {
    if (this.mode !== `inline`) {
      this.stateOn = false;
    } else {
      this.stateOn = true;
    }
  }

  handleHoney(e) {
    console.log(e.target);
    e.target.focus();
  }

  open() {
    this.stateOn = true;
    if (this.mode !== `inline`) {
      // @ts-ignore
      this.globalLoader.ddsComponent.open();
      this.honeypot.nativeElement.focus();
      this.honeypot.nativeElement.addEventListener(`blur`, this.handleHoney);
    }
  }
  close() {
    this.stateOn = false;
    if (this.mode !== `inline`) {
      // @ts-ignore
      this.globalLoader.ddsComponent.close();
      this.honeypot.nativeElement.removeEventListener(`blur`, this.handleHoney);
    }
  }
  toggle() {
    if (this.stateOn) {
      this.close();
    } else {
      this.open();
    }
  }
}
