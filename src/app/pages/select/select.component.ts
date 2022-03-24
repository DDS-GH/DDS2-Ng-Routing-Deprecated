import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-select",
  templateUrl: "./select.component.html"
})
export class SelectPageComponent implements OnInit {
  public selectValue1: Array<string> = [`Loading...`];
  public selectValue2: Array<string> = [`Loading...`];

  // @ts-ignore
  ngOnInit(): void {
    this.getDelayedData();
  }

  getDelayedData(): void {
    setTimeout(() => {
      this.selectValue1 = [`Matrix`, `Free Guy`, `Dark City`, `Demolition Man`];
    }, 750);

    setTimeout(() => {
      this.selectValue2 = [
        `Hitchhiker's Guide to the Universe`,
        `The Princess Bride`,
        `Labyrinth`,
        `Do Androids Dream of Electric Sheep?`
      ];
    }, 1500);
  }

  selectOptionSelected(e: any) {
    console.info(`select component`, e);
  }
}
