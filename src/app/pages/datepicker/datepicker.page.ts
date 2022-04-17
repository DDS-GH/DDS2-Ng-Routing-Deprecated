import { Component } from "@angular/core";

@Component({
  templateUrl: "./datepicker.page.html"
})
// @ts-ignore
export class DatePickerPageComponent {
  public isDisabled: boolean = false;
  private dateNow: Date = new Date();
  public dateMin: any = new Date(
    new Date().setDate(this.dateNow.getDate() - 2)
  );
  public dateNot: any = new Date(
    new Date().setDate(this.dateNow.getDate() + 1)
  );
  public dateTwo: any = new Date(
    new Date().setDate(this.dateNow.getDate() + 2)
  );
  private dateMax: Date = new Date(
    new Date().setDate(this.dateNow.getDate() + 3)
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

  handleClear(e: any) {
    // @ts-ignore
    document
      .getElementById(`ddsDatepicker`)
      ?.querySelector(`input`)?.value = ``;
  }

  handleSet(e: any) {
    // @ts-ignore
    const dp = document.getElementById(`ddsDatepicker`)?.DatePicker;
    dp.setDate(this.dateTwo);
  }

  handleDisable(e: any) {
    this.isDisabled = !this.isDisabled;
  }
}
