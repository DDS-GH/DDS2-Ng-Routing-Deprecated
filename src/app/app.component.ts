import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public showPage = `Home`;
  public menuTags: Array<string> = [];
  public menuSorted: Array<any> = [];
  public tags: any = {
    all: `tag`,
    info: `alert-info-cir`,
    input: `clipboard`,
    layout: `arrange`,
    navigation: `chat-bot`,
    search: `search`,
    secondary: `award-certificate`,
    simple: `cube`
  };

  private menuItems = [
    {
      icon: `card-swipe-left`,
      text: `Sidenav`,
      tags: [`all`, `layout`, `navigation`]
    },
    {
      icon: `disc-software`,
      text: `Radio`,
      tags: [`all`, `input`, `simple`]
    },
    {
      icon: `card-info`,
      text: `TextArea`,
      tags: [`all`, `input`]
    },
    {
      icon: `clone`,
      text: `Modal`,
      tags: [`all`, `layout`, `secondary`]
    },
    {
      icon: `device-data-center`,
      text: `Select`,
      tags: [`all`, `input`]
    },
    {
      icon: `comment`,
      text: `Tooltip`,
      tags: [`all`, `info`]
    },
    {
      icon: `collapse-down-sqr`,
      text: `Accordion`,
      tags: [`all`, `layout`]
    },
    {
      icon: `card-swipe-right`,
      text: `Drawer`,
      tags: [`all`, `layout`, `secondary`]
    },
    {
      icon: `bolt`,
      text: `ActionMenu`,
      tags: [`all`, `input`]
    },
    {
      icon: `fingerprint`,
      text: `Button`,
      tags: [`all`, `input`, `simple`]
    },
    {
      icon: `stack`,
      text: `Dropdown`,
      tags: [`all`, `input`, `search`]
    },
    {
      icon: `alert-check-sqr`,
      text: `Checkbox`,
      tags: [`all`, `input`, `simple`]
    },
    {
      icon: `shield-check`,
      text: `Badge`,
      tags: [`all`, `info`, `simple`]
    },
    {
      icon: `app-window`,
      text: `MessageBar`,
      tags: [`all`, `info`, `secondary`]
    },
    {
      icon: `ellipsis`,
      text: `Breadcrumb`,
      tags: [`all`, `layout`, `navigation`]
    },
    {
      icon: `tag`,
      text: `Tag`,
      tags: [`all`, `input`, `info`]
    },
    {
      icon: `app-window`,
      text: `Tabs`,
      tags: [`all`, `layout`]
    },
    {
      icon: `pencil`,
      text: `TextInput`,
      tags: [`all`, `input`, `search`]
    },
    {
      icon: `full-screen`,
      text: `MoreLess`,
      tags: [`all`, `layout`, `info`]
    }
  ];

  // @ts-ignore
  ngOnInit(): void {
    console.clear();
    this.sortMenu();

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop: string) => searchParams.get(prop)
    });
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    // @ts-ignore
    let qsShowPage = params.showPage; // "some_value"
    if (qsShowPage) {
      this.showPage = qsShowPage;
    }
  }

  constructor(private router: Router) {}

  menuAction() {
    // complex calculation
    this.router.navigate(["/accordion"]);
  }

  sortMenu() {
    // alpha-sort menuItems
    this.menuItems = [
      ...this.menuItems.sort((a, b) =>
        a.text > b.text ? 1 : b.text > a.text ? -1 : 0
      )
    ];
    // sort tags into a unique array
    this.menuItems.forEach((mi) => {
      mi.tags.forEach((tag) => {
        if (!this.menuTags.includes(tag)) {
          this.menuTags.push(tag);
        }
      });
    });
    // alpha-sort tags
    this.menuTags = [
      ...this.menuTags.sort((a, b) => (a > b ? 1 : b > a ? -1 : 0))
    ];
    // distribute items according to tag
    this.menuTags.forEach((tag) => {
      this.menuItems.forEach((item) => {
        if (item.tags.includes(tag)) {
          this.menuSorted.push(item);
        }
      });
    });
  }
}
