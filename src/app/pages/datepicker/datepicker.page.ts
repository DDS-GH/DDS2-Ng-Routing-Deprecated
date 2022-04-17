import { Component } from "@angular/core";

@Component({
  templateUrl: "./datepicker.page.html"
})
// @ts-ignore
export class DatePickerPageComponent {
  private dateNow: Date = new Date();
  private dateMax: Date = new Date(
    new Date().setDate(this.dateNow.getDate() + 3)
  );
  public dateMin: any = new Date(
    new Date().setDate(this.dateNow.getDate() - 2)
  );
  public dateNot: any = new Date(
    new Date().setDate(this.dateNow.getDate() + 1)
  );

  public ddsOptions: any = {
    cancelLabel: `hiss`,
    confirmLabel: `purr`,
    invalidDateErrorMessage: `Prow?? ew dog you drink from the toilet`,
    unavailableDateErrorMessage: `Trip on catnip that box?`,
    todayLabel: `miaou`,
    startDate: this.dateMin,
    endDate: this.dateMax,
    inactiveDates: [this.dateNot],
    locale: `zh-CN`
  };
}
