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
  @Input() label: string;
  @Input() helper: string;
  @Input() groups: any;
  @Input() noOptionsLabel: string = `No options found`;
  @Input() selectedLabel: string = `selected`;
  @Input() srClearLabel: string = `clear selected items`;
  @Input() useBackend: any = `false`;
  @Input() selection: string = `single`;
  @Input() warning: string = ``;
  @Output() onKeyUp: EventEmitter<string> = new EventEmitter<string>();
  @Output() optionSelected: EventEmitter<object> = new EventEmitter<object>();
  @Output() optionDeselected: EventEmitter<object> = new EventEmitter<object>();
  @Output() optionsCleared: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    super.ngOnInit();
    this.ddsInitializer = `Dropdown`;
    this.ddsOptions = {
      selection: this.selection,
      noOptionsLabel: this.noOptionsLabel,
      selectedLabel: this.selectedLabel,
      srClearLabel: this.srClearLabel
    };
    this.useBackend = stringToBoolean(this.useBackend);
    this.parseData();
  }

  ngAfterViewInit() {
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
    const handleDownFinal = (e) => {
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
    const handleKeyDown = throttle((e) => handleDownFinal(e));
    if (this.useBackend) {
      dropdownInput.addEventListener(`keyup`, handleKeyUp);
      dropdownInput.addEventListener(`keydown`, handleKeyDown);
    }
    if (dropdownClear) {
      dropdownClear.addEventListener(`click`, handleClear);
    }
    this.ddsElement.addEventListener(`click`, (e) => {
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

  parseData() {
    if (typeof this.groups === `string`) {
      this.groups = this.groups
        .replace(/\\'/g, "@p0z")
        .replace(/'/g, '"')
        .replace(/@p0z/g, "'");
      try {
        this.groups = JSON.parse(this.groups);
      } catch (e) {
        console.error(e.message);
        this.label = `Error parsing Dropdown Data`;
        this.groups = [];
        this.ddsInitializer = ``; // prevents Dropdown initialization
      }
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.groups &&
      !changes.groups.firstChange &&
      changes.groups.currentValue !== changes.groups.previousValue
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
