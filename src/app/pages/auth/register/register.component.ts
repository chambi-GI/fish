import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  otpSent = false;
  showOtpModal = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\+255\d{9}$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      setTimeout(() => {
        if (this.registerForm.get('name')?.invalid) {
          (document.getElementById('fullName') as HTMLElement)?.focus();
        } else if (this.registerForm.get('phoneNumber')?.invalid) {
          (document.getElementById('phone') as HTMLElement)?.focus();
        } else if (this.registerForm.get('email')?.invalid) {
          (document.getElementById('email') as HTMLElement)?.focus();
        }
      });
      return;
    }
    this.sendOtp();
  }

  sendOtp() {
    // Your OTP logic here
    this.otpSent = true;
    this.showOtpModal = true;
  }

  closeOtpModal() {
    this.showOtpModal = false;
  }
} 