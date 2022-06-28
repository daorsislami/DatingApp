import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from '../_models/user';

// @Injectable this means that this service can be injected in other components or other services in our app
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl

  // we will create an observable to store our User
  // ReplayObject is kind of like a buffer object, is gonna store the values inside here and anytime a subscriber
  // subscribes to this observable it's gonna emit the last value inside it 
  private currentUserSource = new ReplaySubject<User>(1) // size of our buffer is 1
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
    console.log('HTTP Request for /login');
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      // everything that we put inside this pipe is gonna be an RxJS(reactive extend javascript) operator
      map((response: User) => {
        const user = response;
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }


  register(model: any){
    console.log('HTTP request for /register');
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }


  setCurrentUser(user: User) {
    console.log('AccountService:  setCurrentUser()');
    this.currentUserSource.next(user);
  }

  logout(){
    console.log('AccountService:  logout()');
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
