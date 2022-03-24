import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  // onLoadServers() {
  //   // complex calculation
  //   this.router.navigate(['/servers']);
  // }
}
