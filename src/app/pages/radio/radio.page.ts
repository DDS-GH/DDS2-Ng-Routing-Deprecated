import { Component } from "@angular/core";

@Component({
  templateUrl: "./radio.page.html"
})
export class RadioPageComponent {
  public radios: Array<any> = [
    {
      value: `0`,
      label: `Apex`,
      checked: false
    },
    {
      value: `1`,
      label: `Translation`,
      checked: false
    },
    {
      value: `2`,
      label: `Ibex`,
      checked: true
    },
    {
      value: `3`,
      label: `Energy`,
      checked: false
    }
  ];
  public selected: number = 2;

  handleChecked(e: any) {
    this.selected = Number(e);
  }
}
