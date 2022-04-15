import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";
import { DdsComponent } from "../helpers/dds.component";
import { debounce, pascalDash, stringToBoolean } from "../helpers/dds.helpers";

@Component({
  selector: `dds-textinput`,
  templateUrl: `./textinput.component.html`,
  styleUrls: [`./textinput.component.scss`]
})
export class TextInputComponent extends DdsComponent implements OnChanges {
  @Output() onIconClick: EventEmitter<object> = new EventEmitter<object>();
  @Output() onKeyup: EventEmitter<object> = new EventEmitter<object>();
  @Input() type: string = `text`;
  @Input() value: string = ``;
  @Input() label: string = ``;
  @Input() placeholder: string = ``;
  @Input() helper: string = ``;
  @Input() feedback: string = ``;
  @Input() srHide: string = `Hide Password`;
  @Input() srShow: string = `Show Password`;
  @Input() hide: string = `Hide`;
  @Input() show: string = `Show`;
  @Input() minlength: string = ``;
  @Input() maxlength: string = ``;
  @Input() mask: string = ``;
  @Input() button: string = ``;
  @Input() icons: string = ``;
  @Input() iconStart: string = ``;
  @Input() iconClickable: any = `false`;
  @Input() disabled: any = `false`;
  @Input() required: any = `false`;
  @Input() optionalText: string = ` (optional)`;
  public dataDds: string = ``;
  public iconList: Array<string> = [];

  // @ts-ignore
  ngOnInit() {
    super.ngOnInit();
    this.iconClickable = stringToBoolean(this.iconClickable);
    this.disabled = stringToBoolean(this.disabled);
    this.required = stringToBoolean(this.required);
    switch (this.type.toLowerCase()) {
      case `password`:
        this.ddsInitializer = `InputPassword`;
        this.dataDds = pascalDash(this.ddsInitializer);
        this.ddsOptions = {
          srHideTitle: this.srHide,
          srShowTitle: this.srShow,
          showLabel: this.show,
          hideLabel: this.hide
        };
        break;
      case `tel`:
        this.ddsInitializer = `InputMask`;
        this.dataDds = pascalDash(this.ddsInitializer);
        this.ddsOptions = {
          mask: this.mask
        };
        break;
    }
  }

  processIcons() {
    if (this.icons) {
      this.iconList = this.icons.replace(/ /g, ``).split(`,`);
    } else {
      this.iconList = [];
    }
  }

  handleIconClick(e: any) {
    if (this.iconClickable) {
      this.onIconClick.emit({
        id: this.elementId,
        type: e.target.getAttribute(`data-type`),
        value: this.ddsElement.querySelector(`input`).value || undefined
      });
    }
  }

  handleIconKeyup(e: any) {
    if (e.key === `Enter`) {
      this.handleIconClick(e);
    }
  }

  handleKeyupFinal(e: any) {
    this.onKeyup.emit(
      this.ddsElement.querySelector(`input`).value || undefined
    );
  }

  public handleKeyup = debounce((e: any) => this.handleKeyupFinal(e));

  ngOnChanges() {
    this.processIcons();
  }
}
