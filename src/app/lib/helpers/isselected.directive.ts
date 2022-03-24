import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  selector: "[isSelected]"
})
export class IsSelectedDirective implements OnInit {
  constructor(private el: ElementRef) {}
  @Input() isSelected: string;

  ngOnInit() {
    if (this.isSelected) {
      this.el.nativeElement.setAttribute(
        "selected",
        this.stringToBoolean(this.isSelected)
      );
    }
  }

  stringToBoolean = (thisState) => {
    if (thisState === "0" || thisState === "false") {
      return false;
    }
    return true;
  };
}
