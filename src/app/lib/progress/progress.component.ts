import { Component, Input, OnInit } from "@angular/core";
import { setElementId } from "../helpers/dds.helpers";

@Component({
  selector: `dds-progress`,
  templateUrl: `./progress.component.html`
})
export class ProgressComponent implements OnInit {
  @Input() elementId: string = ``;
  @Input() classList: string = ``;
  @Input() steps: any = [
    {
      name: "Step Name",
      state: "complete",
      summary: "Summary text",
      link: "http://www.example.com/"
    },
    {
      name: "Step Name",
      state: "complete",
      summary: "Summary text",
      link: "http://www.example.com/"
    },
    {
      name: "Step Name",
      state: "in-progress",
      summary: "Summary text"
    },
    {
      name: "Step Name",
      state: "inactive",
      summary: "Summary text"
    },
    {
      name: "Step Name",
      state: "active",
      summary: "Summary text",
      link: "http://www.example.com/"
    }
  ];

  ngOnInit() {
    this.elementId = setElementId(this.elementId);
  }
}
