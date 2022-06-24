import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  userAuthenticated: boolean = false;
  
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

}
