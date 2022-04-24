import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { arrayAdd, arrayRemove } from "../../lib/helpers/dds.helpers";
import * as filterData from "./horizontal.page.json";

@Component({
  templateUrl: "./horizontal.page.html",
  styleUrls: ["./horizontal.page.scss"]
})
export class FilterHorizontalPageComponent implements OnInit {
  // @ts-ignore
  @ViewChild("filter0") filter0: ElementRef<HTMLElement>;
  // @ts-ignore
  @ViewChild("filter1") filter1: ElementRef<HTMLElement>;
  // @ts-ignore
  @ViewChild("filter2") filter2: ElementRef<HTMLElement>;
  private clearedRelistener: any;
  public dropdownData: Array<any> = filterData;
  public showTags: boolean = false;
  public dogHouseWarning: string = ``;
  public checkbox0: boolean = false;
  public checkbox1: boolean = false;
  public checkbox2: boolean = false;
  public checkbox3: boolean = false;
  public checkbox4: boolean = false;
  public checkbox5: boolean = false;

  // @ts-ignore
  ngOnInit(): void {
    if (!this.dropdownData.forEach) {
      const nonJsonMenu: any = [];
      Object.keys(this.dropdownData).forEach((key: any) => {
        if (this.dropdownData[key].groups) {
          nonJsonMenu.push({
            stored: this.dropdownData[key].stored,
            groups: this.dropdownData[key].groups
          });
        }
      });
      this.dropdownData = nonJsonMenu;
    }
  }

  checkForNoResults() {
    this.dogHouseWarning = ``;
    this.dropdownData.forEach((ddd: any) => {
      ddd.stored.forEach((storedSelection: any) => {
        if (storedSelection.value && storedSelection.value === `cat07`) {
          this.dogHouseWarning = `No results for some of the selected filters`;
        }
      });
    });
  }

  clearAllFilters() {
    // @ts-ignore
    this.filter0.ddsComponent.clearSelection();
    // @ts-ignore
    this.filter1.ddsComponent.clearSelection();
    // @ts-ignore
    this.filter2.ddsComponent.clearSelection();
    this.dropdownData[0].stored = [];
    this.dropdownData[1].stored = [];
    this.dropdownData[2].stored = [];
    this.checkForNoResults();
  }

  handleDropdown = {
    clear: (index: number, e: any) => {
      this.dropdownData[index].stored = [];
      this.checkForNoResults();
    },
    select: (index: number, e: any) => {
      this.dropdownData[index].stored = arrayAdd(
        this.dropdownData[index].stored,
        e
      );
      this.checkForNoResults();
    },
    deselect: (index: number, e: any) => {
      this.dropdownData[index].stored = arrayRemove(
        this.dropdownData[index].stored,
        e
      );
      this.checkForNoResults();
    },
    keyUp: (index: number, e: any) => {
      this.matchSelectionsWithNewData(index, e);
    },
    externalUpdate: () => {
      // might reinvestigate this function; the handleDropdown.clear within it is brittle,
      // and with 2.7.2+ the Dropdown mutationObservers have a bounce for performance
      // @ts-ignore
      this.filter0.ddsComponent.clearSelection();
      const newData = this.dropdownRandomItems(`New Data`, 1, false, 99, 101);
      this.dropdownData[0].stored = newData.selection;
      // @ts-ignore
      this.filter0.ddsComponent.dispose();
      this.dropdownData[0].groups = JSON.stringify([
        {
          name: `New Data`,
          options: newData.items
        }
      ]);
      setTimeout(() => {
        // @ts-ignore
        this.filter0.initializeNow();
        if (!this.clearedRelistener) {
          // @ts-ignore
          this.clearedRelistener =
            // @ts-ignore
            this.filter0.ddsElement.addEventListener(
              `ddsDropdownSelectionChangeEvent`,
              (e: any) => {
                // @ts-ignore
                if (
                  // @ts-ignore

                  this.filter0.ddsComponent.getSelection().length === 0
                ) {
                  this.handleDropdown.clear(0, null);
                }
              }
            );
        }
      });
    }
  };

  matchSelectionsWithNewData = (index: number, e: string): any => {
    // 1. you'll need to make this your own.
    // 2. this timeout simulates delayed data retrieval
    setTimeout(() => {
      const rememberThese: {
        name: any;
        selected: boolean;
        stored: boolean;
        value?: any;
      }[] = [];
      const randomItems = this.dropdownRandomItems(e, index);
      this.dropdownData[index].stored.forEach((storedOption: any) => {
        if (typeof storedOption === `string`) {
          // if you're not using VALUES for your Dropdown options
          if (!randomItems.selection.includes(storedOption)) {
            rememberThese.push({
              name: storedOption,
              selected: true,
              stored: true
            });
          }
        } else {
          // if you ARE using VALUES for your Dropdown options
          if (
            !randomItems.selection.find((ri: any) => {
              return (
                ri === storedOption.value ||
                (ri.value && ri.value === storedOption.value)
              );
            })
          ) {
            rememberThese.push({
              name: storedOption.name,
              value: storedOption.value,
              selected: true,
              stored: true
            });
          }
        }
      });
      const compiledNewData = [
        {
          name: "Results for " + e,
          options: [...randomItems.items, ...rememberThese]
        }
      ];
      console.log(compiledNewData);
      this.dropdownData[index].groups = compiledNewData;
    }, 500);
  };

  dropdownRandomItems(
    rName: string,
    index = 0,
    noSelected = true,
    min = 3,
    max = 10
  ) {
    // you might need the logic in here where it matches the .stored items
    const selectedItems = [];
    const randomItems = [];
    let usingValuesOnOptions: boolean = false;
    if (!this.dropdownData[index].stored) {
      this.dropdownData[index].stored = [];
    }
    if (typeof this.dropdownData[index].stored !== `string`) {
      usingValuesOnOptions = true;
    }
    for (let i = 0; i < Math.floor(Math.random() * max) + min; i++) {
      let selected = noSelected
        ? false
        : selectedItems.length < 5
        ? Math.floor(Math.random() * 2) === 0
        : false;
      const itemName = `${rName} Item ${i}`;
      const itemValue = `${rName} Item ${i}${i}`;
      if (!usingValuesOnOptions) {
        if (this.dropdownData[index].stored.includes(itemName)) {
          // If you already memorized this before, keep it
          selected = true;
        }
        randomItems.push({
          name: itemName,
          selected: selected
        });
        if (selected) {
          selectedItems.push(itemName);
        }
      } else {
        // if you ARE using VALUES for your Dropdown options
        if (
          this.dropdownData[index].stored.find((storedObj: any) => {
            // If you already memorized this before, keep it
            return storedObj.value === itemValue;
          })
        ) {
          selected = true;
        }
        randomItems.push({
          name: itemName,
          value: itemValue,
          selected: selected
        });
        if (selected) {
          selectedItems.push({
            text: itemName,
            value: itemValue
          });
        }
      }
    }
    const rObj: any = {
      items: randomItems,
      selection: selectedItems
    };
    return rObj;
  }

  handleTagClick(
    dropdownMemoryIndex: number,
    e: any,
    whichDropdown: any,
    whatValue: any
  ) {
    // should not have to use this handleTagClick. For some reason the onDismiss emitter is not working
    if (!e.target.id) {
      whichDropdown.deselect(whatValue);
      // and then, if Dropdown had a proper event emitted for select AND deselect (not just change), one would not have to manually call the handleDropdown.deselect
      this.handleDropdown.deselect(dropdownMemoryIndex, whatValue);
    }
  }
}
