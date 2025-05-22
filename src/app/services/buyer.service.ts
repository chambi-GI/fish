import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BuyerService {
  private dashboardUrl = 'https://fishmarket.juafaida.com/v1/auth/profile'; 

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    return this.http.get<any>(this.dashboardUrl, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
} 