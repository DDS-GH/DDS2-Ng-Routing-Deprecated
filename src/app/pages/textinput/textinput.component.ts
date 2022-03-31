import { AfterViewInit, Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "./textinput.component.html"
})
// @ts-ignore
export class TextInputPageComponent implements AfterViewInit {
  public liveIcons: string = ``;
  private liveValidFormEl: HTMLElement | null = null;
  private closeIcon = `close-x`;

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
    if (e.type === this.closeIcon) {
      // @ts-ignore
      document.getElementById(`${e.id}-input`).value = ``;
      this.liveIcons = this.liveIcons.replace(this.closeIcon, "");
    }
  }

  textInputOnKeyup(e: any) {
    if (e && e.length > 0) {
      this.liveIcons = this.closeIcon;
    } else {
      this.liveIcons = this.liveIcons.replace(this.closeIcon, "");
    }

    // @ts-ignore
    // console.info(document.querySelector(`#liveValid`)?.reportValidity());
    // @ts-ignore
    //this.liveValidFormEl?.submit();
  }
}
