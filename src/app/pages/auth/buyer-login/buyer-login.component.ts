import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buyer-login',
  standalone: false,
  templateUrl: './buyer-login.component.html',
  styleUrl: './buyer-login.component.scss'
})
export class BuyerLoginComponent {
  loginForm: FormGroup;
  otpForm: FormGroup;
  otpSent = false;
  isLoading = false;
  countryCode = '+255';

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]]
    });
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  sendOtp() {
    if (this.loginForm.invalid) {
      this.toastr.error('Please enter a valid phone number');
      return;
    }
    this.isLoading = true;
    const phoneData = {
      phoneNumber: `${this.countryCode}${this.loginForm.value.phoneNumber}`
    };
    this.auth.buyerLogin(phoneData).subscribe({
      next: () => {
        this.isLoading = false;
        this.otpSent = true;
        this.toastr.success('OTP sent successfully');
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error(err.error?.message || 'Failed to send OTP');
      }
    });
  }

  verifyOtp() {
    if (this.otpForm.invalid) {
      this.toastr.error('Please enter a valid OTP');
      return;
    }
    this.isLoading = true;
    const otpData = {
      phoneNumber: `${this.countryCode}${this.loginForm.value.phoneNumber}`,
      otpCode: this.otpForm.value.otp
    };
    this.auth.verifyOTP(otpData).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.accessToken && res.user) {
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('buyerInfo', JSON.stringify(res.user));
          this.toastr.success('OTP verified successfully');
          this.router.navigate(['/buyer/dashboard']);
        } else {
          this.toastr.error('Invalid response from server');
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error(err.error?.message || 'Invalid OTP');
      }
    });
  }
}
