import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// Data Get
import { CartData } from './data';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})


export class ShopCartComponent implements OnInit {

  // Card Form
  cardForm!: UntypedFormGroup;
  submitted = false;


  shippingForm!: UntypedFormGroup;
  submit = false;

  cartDatas: any;
  qty: any = 1;
  subTotal = 0;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {

    this.cardForm = this.formBuilder.group({
      code: ['', [Validators.required]],
    });

  
    this.shippingForm = this.formBuilder.group({
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      code: ['', [Validators.required]],
    });

    this.cartDatas = CartData;
    this.cartDatas.forEach((element: any) => {
      element['total'] = parseFloat(element.price);
      element['qty'] = 1;
      this.subTotal += parseFloat(element.price)
    });
  }

  // Quantity wise price total or total update
  quantity(id: any, ev: any) {
    this.qty = ev.target.value

    this.cartDatas[id].total = parseFloat(this.cartDatas[id].price) * this.qty;
    if (this.cartDatas[id].qty < this.qty) {
      this.subTotal += parseFloat(this.cartDatas[id].price)
    }
    else {
      this.subTotal -= parseFloat(this.cartDatas[id].price)
    }
    this.cartDatas[id].qty = this.qty
  }

  // Remove Cart
  removeCart(event: any, id: any) {
    this.subTotal -= parseFloat(this.cartDatas[id].total)
    event.target.closest('.border-bottom').remove();
  }


  get form() { return this.cardForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.cardForm.invalid) {
      return;
    }
  }

  get sform() { return this.shippingForm.controls; }

  Submit() {
    this.submit = true;
    if (this.shippingForm.invalid) {
      return;
    }
  }

}
