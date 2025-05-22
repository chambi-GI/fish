import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-signin',
  templateUrl: './account-signin.component.html',
  styleUrls: ['./account-signin.component.scss']
})

/**
 * Account Signin Component
 */
export class AccountSigninComponent implements OnInit {

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;

  // Signup form
  SignupForm!: UntypedFormGroup;
  submit = false;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
     this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });

     /**
     * Form Validatyion
     */
      this.SignupForm = this.formBuilder.group({
        f_name: ['', [Validators.required]],
        l_name: ['', [Validators.required]],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        password: ['', Validators.required],
        cpassword: ['', Validators.required],
      });
  }

  //------------------ Sign In Form ---------------------//
   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }

   /**
    * Form submit
    */
    onSubmit() {
     this.submitted = true;
 
     // stop here if form is invalid
     if (this.loginForm.invalid) {
       return;
     }
   }

    //------------------ Sign Up Form ---------------------//

   // convenience getter for easy access to form fields
   get fa() { return this.SignupForm.controls; }

   /**
    * Form submit
    */
    SignupSubmit() {
     this.submit = true;
 
     // stop here if form is invalid
     if (this.SignupForm.invalid) {
       return;
     }
   }

}
