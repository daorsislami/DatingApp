import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log('NavComponent: ngOnInit() -> calling getCurrentUser()')
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next: response => {
        this.router.navigateByUrl('/members'); // after they login just redirect them to our members using our DI router variable
      },
      error: error => {
        console.log(error)
        this.toastr.error(error.error);
      }
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }
}
