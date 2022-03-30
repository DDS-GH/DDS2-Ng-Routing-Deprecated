import { BrowserModule } from "@angular/platform-browser";
import { NgModule, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';

// sandbox pages
import { AppComponent } from "./app.component";
import { HomePageComponent } from "./pages/home/home.component";
import { AccordionPageComponent } from "./pages/accordion/accordion.component";
import { ActionMenuPageComponent } from "./pages/actionmenu/actionmenu.component";
import { BadgePageComponent } from "./pages/badge/badge.component";
import { BreadcrumbPageComponent } from "./pages/breadcrumb/breadcrumb.component";
import { ButtonPageComponent } from "./pages/button/button.component";
import { DrawerPageComponent } from "./pages/drawer/drawer.component";
import { DropdownPageComponent } from "./pages/dropdown/dropdown.component";
import { FormPageComponent } from "./pages/form/form.component";
import { MessageBarPageComponent } from "./pages/messagebar/messagebar.component";
import { ModalPageComponent } from "./pages/modal/modal.component";
import { MoreLessPageComponent } from "./pages/moreless/moreless.component";
import { SelectPageComponent } from "./pages/select/select.component";
import { SidenavPageComponent } from "./pages/sidenav/sidenav.component";
import { TabsPageComponent } from "./pages/tabs/tabs.component";
import { TagPageComponent } from "./pages/tag/tag.component";
import { TextAreaPageComponent } from "./pages/textarea/textarea.component";
import { TextInputPageComponent } from "./pages/textinput/textinput.component";
import { TooltipPageComponent } from "./pages/tooltip/tooltip.component";
import { CheckboxPageComponent } from "./pages/checkbox/checkbox.component";
import { RadioPageComponent } from "./pages/radio/radio.component";
import { Ticket319Component } from "./pages/dropdown/inside-accordion/ticket319.component";

// library components
import { AccordionModule } from "./lib/accordion/accordion.module";
import { ActionMenuModule } from "./lib/actionmenu/actionmenu.module";
import { BadgeComponent } from "./lib/badge/badge.component";
import { BreadcrumbComponent } from "./lib/breadcrumb/breadcrumb.component";
import { ButtonComponent } from "./lib/button/button.component";
import { DrawerComponent } from "./lib/drawer/drawer.component";
import { DropdownComponent } from "./lib/dropdown/dropdown.component";
import { FormComponent } from "./lib/form/form.component";
import { HeaderComponent } from "./lib/header/header.component";
import { MessageBarComponent } from "./lib/messagebar/messagebar.component";
import { ModalComponent } from "./lib/modal/modal.component";
import { MoreLessComponent } from "./lib/moreless/moreless.component";
import { SelectComponent } from "./lib/select/select.component";
import { SidenavModule } from "./lib/sidenav/sidenav.module";
import { TabsComponent } from "./lib/tabs/tabs.component";
import { TagComponent } from "./lib/tag/tag.component";
import { TextAreaComponent } from "./lib/textarea/textarea.component";
import { TextInputComponent } from "./lib/textinput/textinput.component";
import { TooltipComponent } from "./lib/tooltip/tooltip.component";

// directgives
import { IsSelectedDirective } from "./lib/helpers/isselected.directive";

const appRoutes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "accordion", component: AccordionPageComponent },
  { path: "actionmenu", component: ActionMenuPageComponent },
  { path: "badge", component: BadgePageComponent },
  { path: "breadcrumb", component: BreadcrumbPageComponent },
  { path: "button", component: ButtonPageComponent },
  { path: "checkbox", component: CheckboxPageComponent },
  { path: "drawer", component: DrawerPageComponent },
  { path: "dropdown", component: DropdownPageComponent },
  { path: "form", component: FormPageComponent },
  { path: "messagebar", component: MessageBarPageComponent },
  { path: "modal", component: ModalPageComponent },
  { path: "moreless", component: MoreLessPageComponent },
  { path: "radio", component: RadioPageComponent },
  { path: "select", component: SelectPageComponent },
  { path: "sidenav", component: SidenavPageComponent },
  { path: "tabs", component: TabsPageComponent },
  { path: "tag", component: TagPageComponent },
  { path: "textarea", component: TextAreaPageComponent },
  { path: "textinput", component: TextInputPageComponent },
  { path: "tooltip", component: TooltipPageComponent },
  { path: "ticket319", component: Ticket319Component }
];

const components = [
  BadgeComponent,
  BreadcrumbComponent,
  ButtonComponent,
  DrawerComponent,
  DropdownComponent,
  FormComponent,
  HeaderComponent,
  MessageBarComponent,
  ModalComponent,
  MoreLessComponent,
  SelectComponent,
  TabsComponent,
  TagComponent,
  TextAreaComponent,
  TextInputComponent,
  TooltipComponent
];

const pages = [
  HomePageComponent,
  AccordionPageComponent,
  ActionMenuPageComponent,
  BadgePageComponent,
  BreadcrumbPageComponent,
  ButtonPageComponent,
  CheckboxPageComponent,
  DrawerPageComponent,
  DropdownPageComponent,
  FormPageComponent,
  MessageBarPageComponent,
  ModalPageComponent,
  MoreLessPageComponent,
  RadioPageComponent,
  SelectPageComponent,
  SidenavPageComponent,
  TabsPageComponent,
  TagPageComponent,
  TextAreaPageComponent,
  TextInputPageComponent,
  TooltipPageComponent,
  Ticket319Component
];

const directives = [IsSelectedDirective];

@NgModule({
  declarations: [AppComponent, ...components, ...pages, ...directives],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AccordionModule,
    ActionMenuModule,
    SidenavModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
  ngOnInit() {
    console.clear();
  }
}
