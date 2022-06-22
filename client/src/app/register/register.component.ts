import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  // we're sending here data from parent component to child component
  // this was just a test to see how we can send data from parent component to child component 
  // @Input() usersFromHomeComponent: any;

  // we're sending here data from child component to parent component
  @Output() cancelRegister = new EventEmitter();
  model: any = {}
  
  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.model);
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => {
        console.log(error)
        this.toastr.error(error.error);
      }
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
