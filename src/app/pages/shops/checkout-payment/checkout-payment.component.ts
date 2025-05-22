import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, } from '@angular/forms';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
  
  }

  onSubmit() {
 
  }

}
