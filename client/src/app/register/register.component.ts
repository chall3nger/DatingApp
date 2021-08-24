import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  maxDate!: Date;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initalizeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  initalizeForm() {
    this.registerForm = this.fb.group({
      gender:  ['male'],
      username:  ['', Validators.required],
      knownAs:  ['', Validators.required],
      dateOfBirth:  ['', Validators.required],
      city:  ['', Validators.required],
      country:  ['', Validators.required],
      password:  ['', [Validators.required, Validators.minLength(4),
        Validators.maxLength(8)]],
      confirm_password: ['', [Validators.required]]
    }, { 
      validator: this.matchValues('password', 'confirm_password')
    })
    
  }

  matchValues(controlName: string, matchingControlName: string){ 
     return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
    }
    if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
    } else {
        matchingControl.setErrors(null);
    }
    }
  }

  get f(){
    return this.registerForm.controls;
  }


  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, error => {
      this.validationErrors = error;
      
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
