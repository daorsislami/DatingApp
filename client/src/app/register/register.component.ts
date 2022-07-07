import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = []; // this is for our server side validation if we do have
  
  constructor(private accountService: AccountService, private toastr: ToastrService, 
    private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
    // we can init our form here
    this.initializeForm();
  }

  initializeForm() {
    // a formgroup contains form controls
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]] // we can add a custom validator so that we can compare password field with confirm password field
    });

    // if we change password after we validated the confirm password the form will show as valid
    // so to change that we add this code so that we update the validity
    this.registerForm.controls.password.valueChanges.subscribe( () => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  // to create custom validator
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      // control?.value is our confirm password and what we are doing is accessing the parent control and then we'll pass the password to see if it's equals
      // or not if it is we return null that means validation passed, if password doesn't match then we return
      // a validator error called is matchin to the control and this will fail the validation
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }

  register() {    
    this.accountService.register(this.registerForm.value).subscribe({
      next: response => {
        console.log(response);
        this.router.navigateByUrl('/members');
      },
      error: error => {
        console.log(error)
        this.validationErrors = error; // if we have server side validation then put them in array
      }
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
