import { Component, OnInit } from '@angular/core';
import { AuthService, RegisterData, OtpData } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  buyer_selected: boolean = false;
  seller_selected: boolean = true;
  otpSent: boolean = false;
  isSendingOtp: boolean = false;
  isVerifyingOtp: boolean = false;
  showOtpModal: boolean = false;

  registerForm: FormGroup;
  otpForm: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      countryCode: ['+255', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+?\d{9,12})$/)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otpCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  ngOnInit(): void {}

  getFullPhoneNumber(): string {
    const code = this.registerForm.get('countryCode')?.value || '';
    const number = this.registerForm.get('phoneNumber')?.value || '';
    return code + number;
  }

  sendOtp(): void {
    if (this.registerForm.invalid) {
      this.toastr.error('Please fill in all fields correctly');
      return;
    }

    this.isSendingOtp = true;

    const formData: RegisterData = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      phoneNumber: this.getFullPhoneNumber()
    };

    this.authService.sendOtp(formData).subscribe({
      next: () => {
        this.otpSent = true;
        this.isSendingOtp = false;
        this.toastr.success('OTP sent successfully. Please check your phone.');
        this.showOtpModal = true;
      },
      error: (error) => {
        console.error('Error sending OTP:', error);
        this.isSendingOtp = false;
        this.toastr.error(error.error?.message || 'Failed to send OTP');
      }
    });
  }

  verifyOtp(): void {
    if (this.otpForm.invalid) {
      this.toastr.error('Please enter a valid 6-digit OTP');
      return;
    }

    this.isVerifyingOtp = true;

    const otpData: OtpData = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      phoneNumber: this.getFullPhoneNumber(),
      otpCode: this.otpForm.get('otpCode')?.value
    };

    this.authService.verifyOtp(otpData).subscribe({
      next: () => {
        this.router.navigate(['/admin/seller']);
        this.isVerifyingOtp = false;
        this.toastr.success('Registration successful!');
      },
      error: (error) => {
        console.error('Error verifying OTP:', error);
        this.isVerifyingOtp = false;
        this.toastr.error(error.error?.message || 'Invalid OTP');
      }
    });
  }

  closeOtpModal(): void {
    this.showOtpModal = false;
  }
}
