import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    images: string[];
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: OrderItem[];
  total: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  trackingNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: string;
}

export interface SalesData {
  total: number;
  change: number;
  period: string;
}

export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) { }

  // Seller specific endpoints
  getSellerTodaySales(): Observable<SalesData> {
    return this.http.get<SalesData>(`${this.apiUrl}/seller/today-sales`);
  }

  getSellerOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/seller`);
  }

  getSellerOrderStats(): Observable<OrderStats> {
    return this.http.get<OrderStats>(`${this.apiUrl}/seller/stats`);
  }

  getSellerOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/seller/${orderId}`);
  }

  updateOrderStatus(orderId: string, status: Order['status']): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/seller/${orderId}/status`, { status });
  }

  updateTrackingNumber(orderId: string, trackingNumber: string): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/seller/${orderId}/tracking`, { trackingNumber });
  }

  // Customer specific endpoints
  getCustomerOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/customer`);
  }

  getCustomerOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/customer/${orderId}`);
  }

  createOrder(orderData: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}`, orderData);
  }

  cancelOrder(orderId: string): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/${orderId}/cancel`, {});
  }

  // Admin specific endpoints
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/admin`);
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/admin/${orderId}`);
  }

  updateOrder(orderId: string, orderData: Partial<Order>): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/admin/${orderId}`, orderData);
  }

  deleteOrder(orderId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/${orderId}`);
  }
} 