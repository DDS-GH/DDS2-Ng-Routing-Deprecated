import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from "@angular/forms";
import { of } from "rxjs";

@Component({
  templateUrl: "./checkbox.page.html"
})
// @ts-ignore
export class CheckboxPageComponent {
  public checkboxOn: boolean = true;
  public checkboxOn2: boolean = false;
  public checkboxOn3: boolean = true;
  form: FormGroup;
  ordersData: Array<any> = [];

  get ordersFormArray() {
    return this.form.controls["orders"] as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      orders: new FormArray([], this.minSelectedCheckboxes(1))
    });

    // async orders
    of(this.getOrders()).subscribe((orders) => {
      this.ordersData = orders;
      this.addCheckboxes();
    });

    // synchronous orders
    // this.ordersData = this.getOrders();
    // this.addCheckboxes();
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

  submit() {
    const selectedOrderIds = this.form.value.orders
      .map((checked: any, i: number) =>
        checked ? this.ordersData[i].id : null
      )
      .filter((v: any) => v !== null);
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
