import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./accordion.page.html"
})
export class AccordionPageComponent implements OnInit {
  public items1: Array<any> = [];
  // you would need a separate array and handler for every accordion you want to track this way
  public items2: Array<any> = [
    {
      title: `Multi-Level Example`,
      expanded: false
    },
    {
      title: `Sasha Marcy Anne`,
      expanded: false
    },
    {
      title: `Yet Another Item`,
      expanded: false
    }
  ];
  private memoryItem = `accordions`;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items1 = [false, true];
    let savedValues: any = this.getData();
    if (savedValues) {
      savedValues = JSON.parse(savedValues);
      this.items2.forEach((item: any, index: number) => {
        this.items2[index].expanded = savedValues[index].expanded;
      });
    }
  }

  // onLoadServers() {
  //   // complex calculation
  //   this.router.navigate(['/servers']);
  // }

  setData(data: any) {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(this.memoryItem, jsonData);
  }

  getData() {
    return localStorage.getItem(this.memoryItem);
  }

  removeData(key: any) {
    localStorage.removeItem(key);
  }

  handleItemClick(e: any) {
    console.info(`item`, e.target);
  }

  handleAccordionClick(e: any) {
    // TODO replace closest's with getClosest
    const eTarget = e.target.closest(`.dds__accordion__item`);
    let eText = eTarget.querySelector(`.dds__accordion__button span`);
    if (eText) {
      eText = eText.innerText.trim();
    }
    const elAccord = e.target.closest(`.dds__accordion`);
    const elItems = elAccord.querySelectorAll(`.dds__accordion__item`);
    const accordIndependent = elAccord.getAttribute(`data-independent`);
    elItems.forEach((elItem: any) => {
      const elItemText = elItem
        .querySelector(`.dds__accordion__button span`)
        .innerText.trim();

      const memoryItem = this.items2.find((item: any) => {
        return item.title === elItemText;
      });
      if (accordIndependent && memoryItem) {
        memoryItem.expanded = false;
      }
      if (elItem.classList.contains(`dds__accordion__item--expanding`)) {
        if (memoryItem) {
          memoryItem.expanded = true;
        }
      }
    });
    this.setData(this.items2);
  }
}
