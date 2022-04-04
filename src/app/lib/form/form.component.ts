import { Component, AfterViewInit, Input } from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: `dds-form`,
  templateUrl: `./form.component.html`,
  styleUrls: [`./form.component.scss`]
})
export class FormComponent extends DdsComponent implements AfterViewInit {
  @Input() classList: string;
  // public angForm: FormGroup;

  // constructor(private fb: FormBuilder) {
  //   super();
  //   this.createForm();
  // }

  // createForm() {
  //   this.angForm = this.fb.group({
  //     name: ['', Validators.required],
  //   });
  // }

  ngOnInit() {
    super.ngOnInit();
    this.ddsInitializer = {
      component: `Form`,
      selector: `form-validation`
    };
  }
}
