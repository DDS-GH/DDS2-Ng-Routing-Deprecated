import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { setElementId } from "../helpers/dds.helpers";

@Component({
  selector: `dds-load`,
  templateUrl: `./load.component.html`,
  styleUrls: [`./load.component.scss`]
})
export class LoadComponent extends DdsComponent implements OnInit, OnChanges {
  @ViewChild(`loadRef`) loadRef!: ElementRef<HTMLElement>;
  @Input() label: string = `Loading`;
  @Input() mode: string = `global`;
  @Input() placement: string = `top`;
  @Input() size: string = `sm`;
  public stateOn: boolean = true;

  override ngOnInit(): void {
    super.ngOnInit();
    this.ddsInitializer = `LoadingIndicator`;
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
      if (this.ddsComponent.dispose) {
        this.ddsComponent.dispose();
        this.ddsComponent.show = undefined;
        this.ddsComponent.hide = undefined;
      }
      this.stateOn = false;
    } else {
      this.stateOn = true;
    }
  }

  open() {
    this.stateOn = true;
    if (this.mode === `global`) {
      if (!this.ddsComponent.show) {
        this.ddsElement = this.loadRef.nativeElement;
        this.initializeNow();
      }
      try {
        this.ddsComponent.show();
      } catch (e: any) {
        console.log(e);
        // component is inline; swallow error
      }
    }
  }
  close() {
    this.stateOn = false;
    if (this.mode === `global`) {
      if (!this.ddsComponent.hide) {
        this.ddsElement = this.loadRef.nativeElement;
        this.initializeNow();
      }
      try {
        this.ddsComponent.hide();
      } catch (e: any) {
        console.log(e);
        // component is inline; swallow error
      }
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
