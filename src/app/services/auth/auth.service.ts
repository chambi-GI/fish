import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject, tap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { VariablesService } from '../public/variables.service';
import { environment } from '../../../environments/environment';


interface OtpPayload {
  phoneNumber: string;
  otpCode: string;
}

interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface User {

   
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  roles: string[];
  isVerified: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private variable: VariablesService
  ) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  sellerLogin(data: { phoneNumber: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/phone`,data)
      .pipe(catchError(this.handleError));
  }

  registerSeller(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/seller`, data)
      .pipe(catchError(this.handleError));
  }

  buyerLogin(data: { phoneNumber: string }): Observable<any> {
     return this.http.post(`${this.apiUrl}/authenticate`, data)
      .pipe(catchError(this.handleError));
  }

  registerBuyer(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, data)
      .pipe(catchError(this.handleError));
  }

  verifyOTP(payload: OtpPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/verify-otp`, payload);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, {
      headers: this.getAuthHeaders()
    }).pipe(catchError(this.handleError));
  }

  forgotPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/resetPassword`, data)
      .pipe(catchError(this.handleError));
  }

  mobileForgotPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/mobileResetPassword`, data)
      .pipe(catchError(this.handleError));
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getUserType(): string | null {
    return localStorage.getItem('user_type');
  }

  getToken(): string | null {
    return localStorage.getItem('token') || localStorage.getItem('seller_token');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  private setAuthData(token: string, userType: string, userData: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user_type', userType);
    localStorage.setItem('user_data', JSON.stringify(userData));
    if (userData) {
      localStorage.setItem('fullname', userData.fullname || '');
      localStorage.setItem('email', userData.email || '');
      localStorage.setItem('id', userData.id?.toString() || '');
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else if (error.status === 401) {
        errorMessage = 'Unauthorized access. Please login again.';
        this.logout();
      } else if (error.status === 404) {
        errorMessage = 'Resource not found.';
      } else if (error.status === 400) {
        errorMessage = 'Invalid request. Please check your input.';
      } else if (error.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
    }
    return throwError(() => ({ message: errorMessage }));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('seller_token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_data');
    localStorage.removeItem('fullname');
    localStorage.removeItem('email');
    localStorage.removeItem('profile');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
    this.currentUserSubject.next(null);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        })
      );
  }

  register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        })
      );
  }

  updateUserProfile(userData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/profile`, userData)
      .pipe(
        tap(updatedUser => {
          localStorage.setItem('user', JSON.stringify(updatedUser));
          this.currentUserSubject.next(updatedUser);
        })
      );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, {
      currentPassword,
      newPassword
    });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, {
      token,
      newPassword
    });
  }
}






