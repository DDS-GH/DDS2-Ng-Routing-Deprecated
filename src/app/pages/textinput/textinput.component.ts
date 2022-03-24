import { AfterViewInit, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-textinput",
  templateUrl: "./textinput.component.html"
})
// @ts-ignore
export class TextInputPageComponent implements AfterViewInit {
  public liveIcons: string = ``;
  private liveValidFormEl: HTMLElement | null = null;

  ngAfterViewInit() {
    // doesn't work; probably should be using some ANGULAR form validation, anyway.
    // this.liveValidFormEl = document.getElementById(`liveValid`);
    // if (this.liveValidFormEl) {
    //   this.liveValidFormEl.addEventListener("submit", (event) => {
    //     // stop form submission
    //     console.log("stopped");
    //     event.preventDefault();
    //   });
    // }
  }

  textInputIconClick(e: any) {
    if (e.type === `close-x`) {
      // @ts-ignore
      document.getElementById(`${e.id}-input`).value = ``;
      this.liveIcons = ``;
    }
  }

  textInputOnKeyup(e: any) {
    if (e.length > 0) {
      this.liveIcons = `close-x`;
    }

    // @ts-ignore
    // console.info(document.querySelector(`#liveValid`)?.reportValidity());
    // @ts-ignore
    //this.liveValidFormEl?.submit();
  }
}
