import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { VariablesService } from '../public/variables.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface WishlistItem {
  id: string;
  productId: string;
  userId: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  url: any;
  token: any;
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    public variable: VariablesService,
  ) {
    this.url = this.variable.baseUrl;
    this.apiUrl = `${this.url}/wishlist`;
  }

  registerSeller(data: any) {
    return this.http.post<any>(`${this.url}auth/register/seller`, data);
  }

  registerBuyer(data: any) {
    return this.http.post<any>(`${this.url}auth/authenticate`, data);
  }

  userLogin(data: any) {
    return this.http.post<any>(`${this.url}auth/login/phone`, data);
  }

  verifyOTP(data: any) {
    return this.http.post<any>(`${this.url}auth/verify-otp`, data);
  }

  getUserProfile() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.url}auth/profile`, { headers });
  }

  forgotPassword(data: any) {
    return this.http.post<any>(`${this.url}/resetPassword`, data);
  }

  mobileForgotPassword(data: any) {
    return this.http.post<any>(`${this.url}/mobileResetPassword`, data);
  }

  changePassword(data: any) {
    return this.http.post<any>(`${this.url}/changePassword`, data);
  }

  activateAccount(data: any) {
    return this.http.post<any>(`${this.url}/activateAccount`, data);
  }

  userLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('fullname');
    localStorage.removeItem('email');
    localStorage.removeItem('profile');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  loggedIn() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      return true;
    } else {
      return false;
    }
  }

  getWishlist(): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(this.apiUrl);
  }

  addToWishlist(productId: string): Observable<WishlistItem> {
    return this.http.post<WishlistItem>(this.apiUrl, { productId });
  }

  removeFromWishlist(itemId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${itemId}`);
  }

  clearWishlist(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clear`);
  }
}



