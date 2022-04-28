/*
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { setElementId, stringToBoolean } from "../helpers/dds.helpers";
import { FormControl } from "@angular/forms";

@Component({
  selector: `dds-checkbox`,
  templateUrl: `./checkbox.component.html`
})
export class CheckboxComponent implements OnInit {
  // @Output() onChecked: EventEmitter<string> = new EventEmitter<string>();
  @Input() control!: FormControl;
  @Input() elementId: string = ``;
  @Input() classList: string = ``;
  @Input() name: string = ``;

  ngOnInit() {
    this.elementId = setElementId(this.elementId);
  }

  // handleChange(e: any) {
  //   this.onChecked.emit(e);
  // }
}
*/
import { Component, Optional, Self } from "@angular/core";
import { ControlValueAccessor, FormControl, NgControl } from "@angular/forms";

export const NOOP_VALUE_ACCESSOR: ControlValueAccessor = {
  writeValue(): void {},
  registerOnChange(): void {},
  registerOnTouched(): void {}
};

/**
 * This component can accept form control,
 * but doesn't do anything with it.
 * It only passes it down to child MatInput
 * (or any other component that implements ControlValueAccessor interface)
 *
 * It can be used to create complex components
 * that use FormControl internally and add some extra logic to it.
 *
 */
@Component({
  selector: "dds-checkbox",
  template: `
    <div id="elementId" class="dds__checkbox">
      <label class="dds__checkbox__label" for="Input">
        <input
          type="checkbox"
          tabindex="0"
          id="Input"
          class="dds__checkbox__input"
          [formControl]="ngControl.control"
        />
        <span><ng-content></ng-content></span>
      </label>
    </div>
  `
})
export class CheckboxComponent {
  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      // Note: we provide the value accessor through here, instead of
      // the `providers` to avoid running into a circular import.
      // And we use NOOP_VALUE_ACCESSOR so WrappedInput don't do anything with NgControl
      this.ngControl.valueAccessor = NOOP_VALUE_ACCESSOR;
    }
  }
}
