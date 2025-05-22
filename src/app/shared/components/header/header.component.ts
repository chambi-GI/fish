import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone:false
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  cartDatas: any[] = [];
  subTotal: number = 0;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserData();
    this.loadCartData();
  }

  loadUserData() {
    this.currentUser = this.authService.getCurrentUser();
  }

  loadCartData() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartDatas = items;
      this.subTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    });
  }

  calculatetotal(amount: number): string {
    return amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  remove(index: number) {
    this.cartService.removeFromCart(index);
    this.loadCartData();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
} 