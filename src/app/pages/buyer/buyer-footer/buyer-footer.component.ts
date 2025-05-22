import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyer-footer',
  templateUrl: './buyer-footer.component.html',
  styleUrls: ['./buyer-footer.component.scss']
})
export class BuyerFooterComponent implements OnInit {
  cartCount = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    // Example: get cart count from localStorage or API
    const cart = JSON.parse(localStorage.getItem('buyerCart') || '[]');
    this.cartCount = cart.length;
  }

  goToCart() {
    this.router.navigate(['/buyer/cart']);
  }
}
