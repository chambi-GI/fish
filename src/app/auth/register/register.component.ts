import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Redirect to home if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.registerBuyer(this.registerForm.value)
      .subscribe({
        next: (response) => {
          this.loading = false;
          // Handle OTP verification here
          this.router.navigate(['/verify-otp'], {
            queryParams: { phoneNumber: this.registerForm.value.phoneNumber }
          });
        },
        error: (error) => {
          this.loading = false;
          this.error = error.message || 'An error occurred during registration';
        }
      });
  }
} 