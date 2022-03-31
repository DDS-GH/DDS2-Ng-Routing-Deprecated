import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DdsComponent } from '../helpers/dds.component';
import { Uuid, stringToBoolean } from '../helpers/dds.helpers';

@Component({
  selector: `dds-textarea`,
  templateUrl: `./textarea.component.html`,
  styleUrls: [`./textarea.component.scss`],
})
export class TextAreaComponent extends DdsComponent {
  @ViewChild('textContainer') textContainer: ElementRef;
  @ViewChild('srContainer') srContainer: ElementRef;
  @Input() isRequired: string;
  @Input() maxLength: string;
  public defaultText: string;
  public srText: string;
  public textAreaId: string;
  public labelId: string;
  public helperId: string;
  public states: any = {
    required: false,
  };

  ngOnInit() {
    super.ngOnInit();
    this.ddsInitializer = `TextArea`;
    this.textAreaId = `${this.ddsInitializer}-textarea${Uuid()}`;
    this.labelId = `${this.ddsInitializer}-label${Uuid()}`;
    this.helperId = `${this.ddsInitializer}-helper${Uuid()}`;
    this.states.required = stringToBoolean(this.isRequired);
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    setTimeout(() => {
      this.defaultText = this.textContainer?.nativeElement.innerText;
      this.srText = this.srContainer?.nativeElement.innerText;
    })
  }
}
