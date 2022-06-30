import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  busy() {
    this.busyRequestCount++;
    
    // we're making use of our spinner service here 
    // undefined because we don't wanna name our spinner, and we use {} to configure our spinner
    this.spinnerService.show(undefined, {
      type: 'line-scale-party',
      bdColor: 'rgba(255,255,255,0)', // so that we don't dim our background we display the spinner itself
      color: '#333333' // giving the spinner a color
    })
  }

  idle() {
    this.busyRequestCount--;

    if(this.busyRequestCount <= 0){
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
