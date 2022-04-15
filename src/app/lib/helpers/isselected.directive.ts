import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  selector: "[isSelected]"
})
export class IsSelectedDirective implements OnInit {
  constructor(private el: ElementRef) {}
  @Input() isSelected: string | undefined;

  ngOnInit() {
    if (this.isSelected) {
      this.el.nativeElement.setAttribute(
        "selected",
        this.stringToBoolean(this.isSelected)
      );
    }
  }

  stringToBoolean = (thisState: string) => {
    if (thisState === "0" || thisState === "false") {
      return false;
    }
    return true;
  };
}
