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

  public datepickers: Array<any> = [
    {
      isDisabled: false,
      helper: `emergency! abandoned meeooowwww!!!`,
      label: `Playing with balls of wool`,
      placeholder: `MM/DD/YYYY`,
      required: true,
      fullClick: false,
      ddsOptions: {
        cancelLabel: `hiss`,
        confirmLabel: `purr`,
        invalidDateErrorMessage: `Prow?? ew dog you drink from the toilet`,
        unavailableDateErrorMessage: `Trip on catnip that box?`,
        todayLabel: `miaou`,
        startDate: this.dateMin,
        endDate: this.dateMax,
        selectedDate: this.dateNow,
        inactiveDates: [this.dateNot],
        locale: `zh-CN`
      }
    },
    {
      isDisabled: false,
      helper: `Get video posted to internet for chasing red dot`,
      label: `Get let out then scratch at door immmediately after to be let back in`,
      placeholder: `MM/DD/YYYY`,
      required: true,
      fullClick: false,
      ddsOptions: {
        cancelLabel: `hiss`,
        confirmLabel: `purr`,
        invalidDateErrorMessage: `bathrobe meow meow mama`,
        unavailableDateErrorMessage: `finds tiny spot in cupboard and sleeps all day`,
        todayLabel: `miaou`,
        startDate: this.dateMin,
        endDate: this.dateMax,
        selectedDate: this.dateNow,
        inactiveDates: [this.dateNot],
        locale: `ta-IN`
      }
    },
    {
      isDisabled: false,
      helper: `Push your water glass on the floor`,
      label: `Proudly present butt to human`,
      placeholder: `MM/DD/YYYY`,
      required: true,
      fullClick: false,
      ddsOptions: {
        cancelLabel: `hiss`,
        confirmLabel: `purr`,
        invalidDateErrorMessage: `bird bird bird bird bird bird`,
        unavailableDateErrorMessage: `mess up all the toilet paper`,
        todayLabel: `miaou`,
        startDate: this.dateMin,
        endDate: this.dateMax,
        selectedDate: this.dateNow,
        inactiveDates: [this.dateNot],
        locale: `hu-HU`
      }
    }
  ];

  handleClear(e: any) {
    // @ts-ignore
    document
      .getElementById(`ddsDatepicker0`)
      ?.querySelector(`input`)?.value = ``;
    this.datepickers[0].ddsOptions.selectedDate = null;
  }

  handleSet(e: any) {
    // @ts-ignore
    const dp = document.getElementById(`ddsDatepicker0`)?.DatePicker;
    dp.setDate(this.dateTwo);
  }

  handleDisable(e: any) {
    this.datepickers[0].isDisabled = !this.datepickers[0].isDisabled;
  }

  handleChange(e: any, dp: number) {
    this.datepickers[dp].ddsOptions.selectedDate = e.date;
  }
}
