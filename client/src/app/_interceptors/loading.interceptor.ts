import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusyService } from '../_services/busy.service';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // when we're about to send a request we're gonna call busyService.busy()
    this.busyService.busy();

    // and once the request comes back we know it's completed and we're gonna idle it
    return next.handle(request).pipe(
      // our app is way to fast so we're gonna delay it a bit
      delay(1000),
      
      // finalize() gives us the opportunity to do something when something gets completed
      finalize(() => {
        this.busyService.idle();
      })
    );
  }
}
