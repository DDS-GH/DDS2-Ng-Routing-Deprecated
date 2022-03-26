import { Component, OnInit } from '@angular/core';
import { arrayAdd, arrayRemove } from '../../lib/helpers/dds.helpers';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownPageComponent implements OnInit {
  private dropdownBase: Array<any> = [
    {
      hidden: false,
      options: [
        {
          name: 'Alpha Item 0',
          value: 'Alpha Item 00', // to be used after v2.5.1
          selected: false,
        },
        {
          name: 'Not Shown Item 0',
          value: '999',
          selected: false,
          hidden: true,
        },
        {
          name: 'Alpha Item 1',
          value: 'Alpha Item 11',
          selected: false,
        },
        {
          name: 'Not Shown Item 1',
          value: '9992',
          selected: false,
          hidden: true,
        },
        {
          name: 'Alpha Item 2',
          value: 'Alpha Item 22',
          selected: false,
        },
      ],
    },
    {
      name: 'Other Stuff',
      options: [
        {
          name: 'Beta Item 0',
          value: 'Beta Item 00',
          selected: false,
        },
        {
          name: 'Beta Item 1',
          value: 'Beta Item 11',
          selected: false,
        },
        {
          name: 'Beta Item 2',
          value: 'Beta Item 22',
          selected: false,
        },
      ],
    },
  ];
  public dropdownData: Array<any> = [
    {
      stored: [],
      groups: this.dropdownBase,
    },
    {
      stored: [],
      groups: this.dropdownBase,
    },
    {
      stored: [],
      groups: this.dropdownBase,
    },
  ];

  // @ts-ignore
  ngOnInit(): void {
    this.dropdownData.forEach((ddata: any) => {
      // I shouldn't have to stringify but Sandbox is removing JSON formatting for the data
      ddata.groups = JSON.stringify(ddata.groups);
    });
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
    externalUpdate: (e: any) => {
      const newData = this.dropdownRandomItems(`New Data`, 1, false, 99, 101);
      this.dropdownData[1].stored = newData.selection;
      this.dropdownData[1].groups = JSON.stringify([
        {
          name: `New Data`,
          options: newData.items,
        },
      ]);
      console.log(newData);
    },
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
              stored: true,
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
              stored: true,
            });
          }
        }
      });
      const compiledNewData = [
        {
          name: 'Results for ' + e,
          options: [...randomItems.items, ...rememberThese],
        },
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
      console.log('does this ever fire');
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
          selected: selected,
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
          selected: selected,
        });
        if (selected) {
          selectedItems.push({
            text: itemName,
            value: itemValue,
          });
        }
      }
    }
    const rObj: any = {
      items: randomItems,
      selection: selectedItems,
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
