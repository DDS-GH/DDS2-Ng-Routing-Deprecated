import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { arrayAdd, arrayRemove } from "../../lib/helpers/dds.helpers";
import * as filterData from "./filter.page.json";

@Component({
  templateUrl: "./filter.page.html"
})
export class FilterPageComponent implements OnInit {
  @ViewChild("filter0") filter0: ElementRef<HTMLElement>;
  private clearedRelistener: any;
  public dropdownData: Array<any> = filterData;
  public showTags: boolean = false;

  // @ts-ignore
  ngOnInit(): void {
    // this.dropdownData.forEach((ddata: any) => {
    //   // I shouldn't have to stringify but Sandbox is removing JSON formatting for the data
    //   ddata.groups = JSON.stringify(ddata.groups);
    // });
  }

  handleDropdown = {
    clear: (index: number, e: any) => {
      this.dropdownData[index].stored = [];
    },
    select: (index: number, e: any) => {
      this.dropdownData[index].stored = arrayAdd(
        this.dropdownData[index].stored,
        e
      );
    },
    deselect: (index: number, e: any) => {
      this.dropdownData[index].stored = arrayRemove(
        this.dropdownData[index].stored,
        e
      );
    },
    keyUp: (index: number, e: any) => {
      this.matchSelectionsWithNewData(index, e);
    },
    externalUpdate: () => {
      this.filter0.ddsComponent.clearSelection();
      const newData = this.dropdownRandomItems(`New Data`, 1, false, 99, 101);
      this.dropdownData[0].stored = newData.selection;
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
          this.clearedRelistener = this.filter0.ddsElement.addEventListener(
            `ddsDropdownSelectionChangeEvent`,
            (e: any) => {
              if (this.filter0.ddsComponent.getSelection().length === 0) {
                this.handleDropdown.clear(1, null);
              }
            }
          );
        }
      });
    }
  };

  matchSelectionsWithNewData = (index: number, e: string): any => {
    // you'll need to make this your own.
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
              return ri === storedOption.value;
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
      this.dropdownData[index].groups = JSON.stringify(compiledNewData);
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
