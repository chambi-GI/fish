import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  loading = false;
  error = '';
  success = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = false;

    this.authService.mobileForgotPassword(this.forgotPasswordForm.value)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.success = true;
          // Navigate to OTP verification
          this.router.navigate(['/verify-otp'], {
            queryParams: { 
              phoneNumber: this.forgotPasswordForm.value.phoneNumber,
              isPasswordReset: true
            }
          });
        },
        error: (error) => {
          this.loading = false;
          this.error = error.message || 'An error occurred while processing your request';
        }
      });
  }
} 