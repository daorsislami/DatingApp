import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})

// general class for handling formcontrol validation
export class TextInputComponent implements ControlValueAccessor {

  @Input() label: string;
  @Input() type: 'text';

  // we want out text input component to be self contained 
  // we don't want Angular to try and fetch us another instance of what we're doing here
  // we always want this to be self contained and @Self() decorator insures that angular will always inject locally in to this component
  constructor(@Self() public ngControl: NgControl) { 
    
    // now we got access to our control inside this component when we use it inside our register form control
    this.ngControl.valueAccessor = this;
  }
  
  // it doesn't matter if we write code here on the methods that we implemented or not
  writeValue(obj: any): void {
    
  }

  registerOnChange(fn: any): void {
   
  }

  registerOnTouched(fn: any): void {
    
  }


}
