import { Component, Optional, Self } from "@angular/core";
import { ControlValueAccessor, FormControl, NgControl } from "@angular/forms";

@Component({
  template: `
    <h2>Checkbox Page 2</h2>
    <p><a routerLink="/checkbox">Return to Checkbox Page 1</a></p>
    <form>
      <dds-checkbox [formControl]="cbValue">Label</dds-checkbox>
    </form>
  `
})
export class CheckPageComponent {
  cbValue = new FormControl(true);
}

// OR ALMOST:

/*
import { Component, Optional, Self } from "@angular/core";
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgControl
} from "@angular/forms";

@Component({
  template: `
    <form [formGroup]="form">
      <div
        formArrayName="orders"
        *ngFor="let order of ordersFormArray.controls; let i = index"
      >
        <dds-checkbox [formControl]="cbValue">
          {{ ordersData[i].name }}
        </dds-checkbox>
      </div>
      <div *ngIf="!form.valid">At least one order must be selected</div>
    </form>
  `
})
export class CheckPageComponent {
  public form: FormGroup;
  public cbValue = new FormControl(true);
  public ordersData: Array<any> = [];

  get ordersFormArray() {
    return this.form.controls["orders"] as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      orders: new FormArray([], this.minSelectedCheckboxes(1))
    });

    // synchronous orders
    this.ordersData = this.getOrders();
    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.ordersData.forEach(() =>
      this.ordersFormArray.push(new FormControl(false))
    );
  }

  getOrders() {
    return [
      { id: 100, name: "order 1" },
      { id: 200, name: "order 2" },
      { id: 300, name: "order 3" },
      { id: 400, name: "order 4" }
    ];
  }

  minSelectedCheckboxes(min = 1) {
    const validator: any = (formArray: FormArray) => {
      // ValidatorFn
      const totalSelected = formArray.controls
        .map((control) => control.value)
        .reduce((prev, next) => (next ? prev + next : prev), 0);

      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }
}

*/
