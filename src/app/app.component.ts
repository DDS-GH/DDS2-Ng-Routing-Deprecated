import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from "@angular/core";
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError
} from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, AfterViewInit {
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
  public currentRoute: string = ``;

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

  constructor(private router: Router) {
    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show progress spinner or progress bar
        // console.info('Route change detected');
      }

      if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar
        this.currentRoute = event.url.replace("/", "");
        // console.info(event);
      }

      if (event instanceof NavigationError) {
        // Hide progress spinner or progress bar
        // Present error to user
        // console.error(event.error);
      }
    });
  }

  // @ts-ignore
  ngOnInit(): void {
    this.sortMenu();
  }

  // @ts-ignore
  ngAfterViewInit(): void {
    console.clear();
    let baseStyles = [
      "color: #fff",
      "background-color: #444",
      "padding: 6px 8px",
      "border-radius: 2px"
    ].join(";");
    console.info(
      "%cConsole was cleared in app.component.ts ngAfterViewInit",
      baseStyles
    );
  }

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
