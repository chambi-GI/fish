import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  error = '';
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // Redirect to home if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.buyerLogin(this.loginForm.value)
      .subscribe({
        next: (response) => {
          this.loading = false;
          // Handle OTP verification here
          this.router.navigate(['/verify-otp'], {
            queryParams: { phoneNumber: this.loginForm.value.phoneNumber }
          });
        },
        error: (error) => {
          this.loading = false;
          this.error = error.message || 'An error occurred during login';
        }
      });
  }
} 