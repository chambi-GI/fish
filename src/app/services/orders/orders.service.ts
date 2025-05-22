import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderFilters, UpdateOrderStatusDto } from '../../models/order.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getOrders(filters?: OrderFilters): Observable<Order[]> {
    let params = new HttpParams();
    
    if (filters) {
      if (filters.status) params = params.set('status', filters.status);
      if (filters.startDate) params = params.set('startDate', filters.startDate.toISOString());
      if (filters.endDate) params = params.set('endDate', filters.endDate.toISOString());
      if (filters.search) params = params.set('search', filters.search);
      if (filters.sortBy) params = params.set('sortBy', filters.sortBy);
      if (filters.sortOrder) params = params.set('sortOrder', filters.sortOrder);
    }

    return this.http.get<Order[]>(this.apiUrl, { params });
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  updateOrderStatus(id: string, updateDto: UpdateOrderStatusDto): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/${id}/status`, updateDto);
  }

  getOrderStatistics(): Observable<{
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    processingOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
    refundedOrders: number;
  }> {
    return this.http.get<{
      totalOrders: number;
      totalRevenue: number;
      pendingOrders: number;
      processingOrders: number;
      shippedOrders: number;
      deliveredOrders: number;
      cancelledOrders: number;
      refundedOrders: number;
    }>(`${this.apiUrl}/statistics`);
  }

  getRecentOrders(limit: number = 5): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/recent`, {
      params: new HttpParams().set('limit', limit.toString())
    });
  }

  getOrdersByDateRange(startDate: Date, endDate: Date): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/date-range`, {
      params: new HttpParams()
        .set('startDate', startDate.toISOString())
        .set('endDate', endDate.toISOString())
    });
  }
} 