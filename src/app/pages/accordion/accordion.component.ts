import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-accordion",
  templateUrl: "./accordion.component.html"
})
export class AccordionPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  // onLoadServers() {
  //   // complex calculation
  //   this.router.navigate(['/servers']);
  // }
}
