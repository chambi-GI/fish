import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-buyer-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buyer-login.component.html',
  styleUrl: './buyer-login.component.scss'
})
export class BuyerLoginComponent {
  phoneNumber = '';
  loading = false;
  error: string | null = null;
  message: string | null = null;

  constructor(private authService: AuthService) {}

  requestOtp() {
    this.error = null;
    this.message = null;
    if (!this.phoneNumber.match(/^\+\d{10,15}$/)) {
      this.error = 'Please enter a valid phone number (e.g. +12345678901)';
      return;
    }
    this.loading = true;
    this.authService.authenticateBuyer(this.phoneNumber).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = res.message;
        // Optionally store user info: localStorage.setItem('buyerUser', JSON.stringify(res.user));
        // Optionally show OTP input for next step
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Failed to send OTP';
      }
    });
  }
}
