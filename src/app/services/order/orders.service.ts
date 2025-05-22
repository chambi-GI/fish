import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariablesService } from '../public/variables.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  public url: string;
  constructor(private http: HttpClient, public variable: VariablesService) {
    this.url = this.variable.baseUrl;
  }

  createOrder(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.url}orders`, data, { headers });
  }

  cancelOrder(orderId: any, data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(
      `${this.url}orders/${orderId}/cancel`,data,
      { headers }
    );
  }

  getAllOrders() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.url}orders`, { headers });
  }
  getOrdersForSeller() {
    return this.http.get<any>(`${this.url}orders/seller`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  getSpecificOrder(id: any) {
    return this.http.get<any>(`${this.url}orders/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  updateOrderStatus(id: string, data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.patch<any>(`${this.url}orders/${id}/status`, data, {
      headers,
    });
  }

  getOrderById(orderNumber: string) {
    return this.http.get<any>(`${this.url}orders/track/${orderNumber}`);
  }
}
