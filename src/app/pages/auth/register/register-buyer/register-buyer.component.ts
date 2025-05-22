import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-buyer',
  standalone: false,
  templateUrl: './register-buyer.component.html',
  styleUrl: './register-buyer.component.scss'
})
export class RegisterBuyerComponent {
  buyer_selected:boolean=false
  seller_selected:boolean=false;

  buyer_selection(){
    this.buyer_selected=true;
    this.seller_selected=false
  }


  otpSent: boolean = false;
  otpCode: string = '';

  data = {
    phoneNumber: '',
  };

  verification_data = {
    phoneNumber: '',
    otpCode: ''
  };

  constructor(
    public register: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.seller_selection();
  }

  seller_selection() {
    this.buyer_selected = false;
    this.seller_selected = true;
  }

  sendOtp() {
    if ( !this.data.phoneNumber) {
      alert('Please fill in all fields before requesting OTP.');
      return;
    }

    this.register.registerBuyer(this.data).subscribe(
      (res: any) => {
       
        this.otpSent = true;
        this.verification_data.phoneNumber = this.data.phoneNumber;
        alert('OTP sent successfully. Please check your phone.');
      },
      (err) => {
        console.error('Error sending OTP:', err);
        alert('Failed to send OTP. Please try again.');
      }
    );
  }





  verifyOtp(): void {
  const payload = {
    phoneNumber: '+255714923586',
    otpCode: '699052'
  };

  this.register.verifyOTP(payload).subscribe({
    next: (response) => {
     
      alert('Registration successful!');
      this.router.navigate(['/admin/seller']);
    },
    error: (error) => {
      console.error('OTP verification failed:', error);
      alert('OTP verification failed. Please try again.');
    }
  });
}

}
