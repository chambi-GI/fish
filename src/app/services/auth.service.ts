import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RegisterData {
  name: string;
  phoneNumber: string;
  email: string;
}

export interface OtpData extends RegisterData {
  otpCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendOtp(data: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/v1/auth/register/seller`, data);
  }

  verifyOtp(data: OtpData): Observable<any> {
    return this.http.post(`${this.apiUrl}/v1/auth/verify-otp`, data);
  }

  authenticateBuyer(phoneNumber: string) {
    return this.http.post<any>('https://fishmarket.juafaida.com/v1/auth/authenticate', { phoneNumber });
  }

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/v1/auth/profile`, { headers });
  }
} 