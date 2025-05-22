import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  loading = false;
  error = '';
  success = false;
  token: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.token = this.route.snapshot.queryParams['token'] || '';
    if (!this.token) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = false;

    this.authService.resetPassword(this.token, this.resetPasswordForm.value.password)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.success = true;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.message || 'An error occurred while resetting your password';
        }
      });
  }
} 