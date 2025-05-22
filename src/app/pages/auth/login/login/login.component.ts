import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  buyer_selected = false;
  seller_selected = true;
  loginForm: FormGroup;
  otpForm: FormGroup;
  phone: string = '';
  countryCode: string = '+255';
  otpSent = false;
  isNewUser = false;
  isLoading = false;

  constructor(
    private modalService: NgbModal,
    public auth: AuthService,
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

  ngOnInit(): void {
    this.seller_selection();
  }

  buyer_selection() {
    this.buyer_selected = true;
    this.seller_selected = false;
  }

  seller_selection() {
    this.buyer_selected = false;
    this.seller_selected = true;
  }

  sendSellerOtp(modalRef: any) {
    if (this.loginForm.invalid) {
      this.toastr.error('Please enter a valid phone number');
      return;
    }

    this.isLoading = true;
    const phoneData = {
      phoneNumber: `${this.countryCode}${this.loginForm.value.phoneNumber}`
    };

    this.auth.sellerLogin(phoneData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.otpSent = true;
        this.modalService.open(modalRef, { centered: true });
        this.toastr.success('OTP sent successfully');
      },
      error: (err) => {
        this.isLoading = false;
        if (err.error?.token === 0) {
          this.isNewUser = true;
          this.toastr.info('New user detected. Please complete registration.');
        } else {
          this.toastr.error(err.error?.message || 'Failed to send OTP');
        }
      }
    });
  }




  sendBuyerOtp(modalRef: any) {
    if (this.loginForm.invalid) {
      this.toastr.error('Please enter a valid phone number');
      return;
    }

    this.isLoading = true;
    const phoneData = {
      phoneNumber: `${this.countryCode}${this.loginForm.value.phoneNumber}`
    };

    this.auth.buyerLogin(phoneData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.otpSent = true;
        this.modalService.open(modalRef, { centered: true });
        this.toastr.success('OTP sent successfully');
      },
      error: (err) => {
        this.isLoading = false;
        if (err.error?.token === 0) {
          this.isNewUser = true;
          this.toastr.info('New user detected. Please complete registration.');
        } else {
          this.toastr.error(err.error?.message || 'Failed to send OTP');
        }
      }
    });
  }

  verifySellerOtp(modal: any): void {
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

        const token = res?.accessToken;
        const user = res?.user;

        if (token && user) {
          localStorage.setItem('token', token);
          localStorage.setItem('sellerInfo', JSON.stringify(user));
          console.log('Verified user:', user.roles);
          if (user.roles.includes('seller')) {
            console.log('data are ', user.roles['0']);

          }
          // Check if user has the "seller" role
          if (user.roles && Array.isArray(user.roles) && user.roles.includes('seller')) {
            this.toastr.success('OTP verified successfully');
            modal.close();
            this.router.navigate(['/admin/seller']);
          } else {
            this.toastr.warning('Access denied: You are not registered as a seller.');
          }
        } else {
          this.toastr.error('Invalid response from server');
        }
      },
      error: (err) => {
        this.isLoading = false;
        const message = err?.error?.message || 'Invalid OTP';
        this.toastr.error(message);
      }
    });
  }



  verifyBuyerOtp(modal: any): void {
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

        const token = res?.accessToken;
        const user = res?.user;

        if (token && user) {
          // Save data locally
          localStorage.setItem('token', token);
          localStorage.setItem('sellerInfo', JSON.stringify(user));
          console.log('Verified user:', user.roles);
          if (user.roles.includes('seller')) {
            console.log('data are ', user.roles['0']);

          }
          // Check if user has the "seller" role
          if (user.roles && Array.isArray(user.roles) && user.roles.includes('seller')) {
            this.toastr.success('OTP verified successfully');
            modal.close();
            this.router.navigate(['/buyer/dashboard']);
          } else {
            this.toastr.warning('Access denied: You are not registered as a seller.');
          }
        } else {
          this.toastr.error('Invalid response from server');
        }
      },
      error: (err) => {
        this.isLoading = false;
        const message = err?.error?.message || 'Invalid OTP';
        this.toastr.error(message);
      }
    });
  }



  resendOtp() {
    this.isLoading = true;
    const phoneData = {
      phoneNumber: `${this.countryCode}${this.loginForm.value.phoneNumber}`
    };

    this.auth.buyerLogin(phoneData).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('OTP resent successfully');
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error(err.error?.message || 'Failed to resend OTP');
      }
    });
  }
}
