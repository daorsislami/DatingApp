import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  // because we're storing our token as part of our current user inside our accountservice, we're bringing AccountService here
  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: User;


    // we can use the pipe and use take keyword
    // by using the 'take' keyword and by taking one thing from this observable, what we're doing here is saying we want to complete after we've received one of these currentUsers
    // and this way we don't need to unsubscribe anymore, because once an observable has completed then we are effectively not subscribed to it anymore
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);


    // what this is gonna do is attach our token for every request when we're logged in and set that up with our request
    if(currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }

    return next.handle(request);
  }
}
