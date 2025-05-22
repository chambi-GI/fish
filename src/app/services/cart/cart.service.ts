import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariablesService } from '../public/variables.service';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public url: string;
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor(private http: HttpClient, public variable: VariablesService) {
    this.url = this.variable.baseUrl;
    // Load cart from localStorage on service initialization
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  createCart(data: any) {
    return this.http.post<any>(`${this.url}cart`, data);
  }

  getCustomerCart() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.url}cart`, { headers });
  }

  clearCartById() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any>(`${this.url}cart`, { headers });
  }

  deleteCartByProductId(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any>(`${this.url}cart/${id}`, { headers });
  }

  updateCartByProductId(id: string, data: any) {
    return this.http.patch<any>(`${this.url}cart/${id}`, data);
  }

  addToCart(item: CartItem) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, item]);
    }

    this.saveCart();
  }

  removeFromCart(index: number) {
    const currentItems = this.cartItems.value;
    currentItems.splice(index, 1);
    this.cartItems.next([...currentItems]);
    this.saveCart();
  }

  updateQuantity(id: string, quantity: number) {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(i => i.id === id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.next([...currentItems]);
      this.saveCart();
    }
  }

  clearCart() {
    this.cartItems.next([]);
    localStorage.removeItem('cart');
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
  }
}
