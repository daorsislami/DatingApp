import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

// TypeScript supports decorators and this is a way of giving a normal class some extra powers
// and this case is giving our class to be an angular component
// this is known as a decorator
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'The Dating app';
  users: any; // we turn off type safety

  // TypeScript gives us type safety meaning we know the data type of our variables unless we use keyword 'any'


  // to use dependency injection in angular we use constructor
  // this naturally is a asynchronous request
  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    // we use the 'this' keyword when we want to access any property inside a class
    // http belongs to our class so as title
    
    // to handle asynchronous calls, Angular uses observables, they are available in typescript
    // Observables are lazy, they don't do anything unless somebody subscribes to them.
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error)
    })
  }
}
