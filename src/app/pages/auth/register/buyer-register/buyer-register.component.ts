import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-buyer-register',
  templateUrl: './buyer-register.component.html',
  styleUrls: ['./buyer-register.component.scss']
})
export class BuyerRegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern('^\\+[1-9]\\d{1,14}$')
      ]]
    });
  }

  ngOnInit(): void {
    // Check if user is already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/buyer/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;

      const { phoneNumber } = this.registerForm.value;

      this.authService.registerBuyer({ phoneNumber }).subscribe({
        next: (response) => {
          this.successMessage = response.message;
          // Store any necessary data for OTP verification
          localStorage.setItem('registrationPhone', phoneNumber);
          // Navigate to OTP verification page
          this.router.navigate(['/auth/verify-otp']);
        },
        error: (err) => {
          this.error = err.message || 'An error occurred during registration. Please try again.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  // Helper method to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Helper methods for template
  get phoneNumberControl() {
    return this.registerForm.get('phoneNumber');
  }
} 