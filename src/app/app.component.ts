import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import * as menuItems from './app.component.menu.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(`sideNav`) sideNav!: ElementRef<HTMLElement>;
  public menuTags: Array<string> = [];
  public menuSorted: Array<any> = [];
  public tags: any = {
    all: `tag`,
    info: `alert-info-cir`,
    input: `clipboard-lines`,
    layout: `arrange`,
    navigation: `chat-bot`,
    patterns: `microchip`,
    search: `search`,
    secondary: `award-certificate`,
    simple: `cube`,
  };
  public currentRoute: string = ``;
  private menuItems: any = menuItems;

  constructor(private router: Router) {
    this.currentRoute = '';
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show progress spinner or progress bar
        // console.info('Route change detected');
      }

      if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar
        this.currentRoute = event.url.replace('/', '');
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
    console.clear();
    this.sortMenu();
  }

  // @ts-ignore
  ngAfterViewInit(): void {
    /* you can initialize child components by changing their
    "init" property to "manual" and then just calling initializeNow
    whenever you like */
    if (this.sideNav) {
      this.sideNav.initializeNow();
    }
    // console.clear();
    // let baseStyles = [
    //   'color: #fff',
    //   'background-color: #444',
    //   'padding: 6px 8px',
    //   'border-radius: 2px',
    // ].join(';');
    // console.info(
    //   '%cConsole was cleared in app.component.ts ngAfterViewInit',
    //   baseStyles
    // );
  }

  menuAction() {
    // complex calculation
    this.router.navigate(['/accordion']);
  }

  sortMenu() {
    if (!this.menuItems.sort) {
      const nonJsonMenu: any = [];
      Object.keys(this.menuItems).forEach((key) => {
        if (this.menuItems[key].icon) {
          nonJsonMenu.push({
            icon: this.menuItems[key].icon,
            text: this.menuItems[key].text,
            tags: [`all`],
          });
        }
      });
      console.log(nonJsonMenu);
      this.menuItems = nonJsonMenu;
    }
    // alpha-sort menuItems
    this.menuItems = [
      ...this.menuItems.sort((a, b) =>
        a.text > b.text ? 1 : b.text > a.text ? -1 : 0
      ),
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
      ...this.menuTags.sort((a, b) => (a > b ? 1 : b > a ? -1 : 0)),
    ];
    // distribute items according to tag
    // this.menuTags.forEach((tag) => {
    //   this.menuItems.forEach((item) => {
    //     if (item.tags.includes(tag)) {
    //       this.menuSorted.push(item);
    //     }
    //   });
    // });
    console.log(this.menuTags);
  }

  fakeSearch(e: any) {
    if (e.value) {
      alert(`You searched for ${e.value}`);
    }
  }
}
