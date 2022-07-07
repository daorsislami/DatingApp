import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements ControlValueAccessor {
  
  @Input() label: string;
  @Input() maxDate: Date; // we use maxDate because we want to do e.g. you need to be over 18 to use our website and we add a maxDate
  
  // when we use partial what we're really saying is that every single property inside this type is going to be optional
  // we dont have to provide all of the different configurations options we can only provide a couple of them and that's gonna be fine
  // if we dont add partial then we need to define every single possible configuration options that's put inside there
  bsConfig: Partial<BsDatepickerConfig>;


  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    this.bsConfig = {
      containerClass: 'theme-red', // 6 different colors
      dateInputFormat: 'DD MMMM YYYY' // how do we want this displayed inside our date picker
    }
  }
  
  
  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

}
