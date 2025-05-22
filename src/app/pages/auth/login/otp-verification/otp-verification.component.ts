import { Component } from '@angular/core';

@Component({
  selector: 'app-otp-verification',
  standalone: false,
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.scss'
})
export class OtpVerificationComponent {
  seller_selected = true;
  buyer_selected = false;

  phone: string = '';
  countryCode: string = '+255';
  otpSent = true;
  otp = '';

  seller_selection() {
    this.seller_selected = true;
    this.buyer_selected = false;
  }

  buyer_selection() {
    this.seller_selected = false;
    this.buyer_selected = true;
  }

  sendOtp() {
    if (!this.phone) return alert('Please enter your phone number');
    // Simulate sending OTP
    this.otpSent = true;
    console.log(`OTP sent to ${this.countryCode}${this.phone}`);
  }

  verifyOtp() {
    if (this.otp === '123456') {
      alert('OTP Verified Successfully!');
      // Proceed with login or navigation
    } else {
      alert('Invalid OTP');
    }
  }

  resendOtp() {
    console.log('OTP resent');
  }
}

