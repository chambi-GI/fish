import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  businessName: string;
  businessType: string;
  taxId: string;
  isVerified: boolean;
  rating: number;
  totalSales: number;
  totalOrders: number;
  createdAt: string;
  updatedAt: string;
  license?: {
    id: string;
    number: string;
    expiryDate: string;
    documentUrl: string;
  };
}

export interface SellerStats {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  averageRating: number;
}

export interface SellerProfile {
  seller: Seller;
  stats: SellerStats;
}

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private apiUrl = `${environment.apiUrl}/sellers`;

  constructor(private http: HttpClient) { }

  // Profile Management
  getCurrentSeller(): Observable<Seller> {
    return this.http.get<Seller>(`${this.apiUrl}/me`);
  }

  getSellerProfile(): Observable<SellerProfile> {
    return this.http.get<SellerProfile>(`${this.apiUrl}/me/profile`);
  }

  updateProfile(data: Partial<Seller>): Observable<Seller> {
    return this.http.patch<Seller>(`${this.apiUrl}/me`, data);
  }

  updateBusinessInfo(data: Partial<Seller>): Observable<Seller> {
    return this.http.patch<Seller>(`${this.apiUrl}/me/business`, data);
  }

  // License Management
  uploadLicense(licenseData: FormData): Observable<Seller> {
    return this.http.post<Seller>(`${this.apiUrl}/me/license`, licenseData);
  }

  updateLicense(licenseData: FormData): Observable<Seller> {
    return this.http.patch<Seller>(`${this.apiUrl}/me/license`, licenseData);
  }

  // Admin Operations
  getAllSellers(): Observable<Seller[]> {
    return this.http.get<Seller[]>(`${this.apiUrl}/admin`);
  }

  getSellerById(id: string): Observable<Seller> {
    return this.http.get<Seller>(`${this.apiUrl}/admin/${id}`);
  }

  verifySeller(id: string): Observable<Seller> {
    return this.http.patch<Seller>(`${this.apiUrl}/admin/${id}/verify`, {});
  }

  unverifySeller(id: string): Observable<Seller> {
    return this.http.patch<Seller>(`${this.apiUrl}/admin/${id}/unverify`, {});
  }

  // Analytics
  getSellerStats(): Observable<SellerStats> {
    return this.http.get<SellerStats>(`${this.apiUrl}/me/stats`);
  }

  getSalesAnalytics(period: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me/analytics/sales`, {
      params: { period }
    });
  }

  getProductAnalytics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me/analytics/products`);
  }

  // Settings
  updateSettings(settings: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/me/settings`, settings);
  }

  getSettings(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me/settings`);
  }
} 