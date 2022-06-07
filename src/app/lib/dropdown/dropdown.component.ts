import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { debounce, throttle, stringToBoolean } from "../helpers/dds.helpers";

@Component({
  selector: `dds-dropdown`,
  templateUrl: `./dropdown.component.html`,
  styleUrls: [`./dropdown.component.scss`]
})
export class DropdownComponent extends DdsComponent implements OnChanges {
  @Input() label: string = ``;
  @Input() helper: string = ``;
  @Input() groups: any;
  @Input() useBackend: any = `false`;
  @Input() warning: string = ``;
  @Output() onKeyUp: EventEmitter<string> = new EventEmitter<string>();
  @Output() optionSelected: EventEmitter<object> = new EventEmitter<object>();
  @Output() optionDeselected: EventEmitter<object> = new EventEmitter<object>();
  @Output() optionsCleared: EventEmitter<string> = new EventEmitter<string>();
  private listeners: Array<any> = [];

  override ngOnInit(): void {
    super.ngOnInit();
    this.ddsInitializer = `Dropdown`;
    this.useBackend = stringToBoolean(this.useBackend);
    this.parseData();
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
    const dropdownNotice = this.ddsElement.querySelector(
      `.dds__dropdown__notice`
    );
    const dropdownInput = this.ddsElement.querySelector(
      `.dds__dropdown__input-field`
    );
    const dropdownClear = this.ddsElement.querySelector(`.dds__tag`);
    const handleUpFinal = () => {
      dropdownNotice.innerText = ``;
      this.onKeyUp.emit(dropdownInput.value);
    };
    const handleDownFinal = (e: any) => {
      const ignoredKeys = [`ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`];
      if (!ignoredKeys.includes(e.key) && this.noOptionsLabel) {
        dropdownNotice.innerText = this.noOptionsLabel;
      }
    };
    const handleClear = (e: any) => {
      if (!e.target.title) {
        // the "X" button doesn't have a title, but the button itself does
        this.optionsCleared.emit(this.ddsComponent.getValue());
      }
    };
    const handleKeyUp = debounce(() => handleUpFinal());
    const handleKeyDown = throttle((e: any) => handleDownFinal(e));
    if (this.useBackend && !this.listeners.includes(`backendKeys`)) {
      this.listeners.push(`backendKeys`);
      dropdownInput.addEventListener(`keyup`, handleKeyUp);
      dropdownInput.addEventListener(`keydown`, handleKeyDown);
    }
    if (dropdownClear && !this.listeners.includes(`dropdownClear`)) {
      this.listeners.push(`dropdownClear`);
      dropdownClear.addEventListener(`click`, handleClear);
    }
    if (!this.listeners.includes(`clicking`)) {
      this.listeners.push(`clicking`);
      this.ddsElement.addEventListener(`click`, (e: any) => {
        if (
          e.target.classList &&
          e.target.classList.contains(`dds__dropdown__item-option`)
        ) {
          const dataValue = e.target.getAttribute("data-value");
          let valueToSubmit: any;
          if (dataValue) {
            valueToSubmit = {
              value: dataValue,
              text: e.target.innerText.trim()
            };
          } else {
            valueToSubmit = e.target.innerText.trim();
          }
          if (!stringToBoolean(e.target.getAttribute(`data-selected`))) {
            this.optionDeselected.emit(valueToSubmit);
          } else {
            this.optionSelected.emit(valueToSubmit);
          }
        }
      });
    }
  }

  parseData() {
    if (typeof this.groups === `string`) {
      this.groups = this.groups
        .replace(/\\'/g, "@p0z")
        .replace(/'/g, '"')
        .replace(/@p0z/g, "'");
      try {
        this.groups = JSON.parse(this.groups);
      } catch (e: any) {
        console.error(e.message);
        this.label = `Error parsing Dropdown Data`;
        this.groups = [];
        this.ddsInitializer = ``; // prevents Dropdown initialization
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes[`groups`] &&
      !changes[`groups`].firstChange &&
      changes[`groups`].currentValue !== changes[`groups`].previousValue
    ) {
      this.parseData();
    }
  }

  deselect(removalValue: any) {
    try {
      if (typeof removalValue === `string`) {
        this.ddsComponent.deselectOption(removalValue.trim());
      } else {
        this.ddsComponent.deselectOption(removalValue.value.trim());
      }
    } catch (e) {
      console.error(e, removalValue);
    }
  }
}
