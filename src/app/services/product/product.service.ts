import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  sold: number;
  category: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  getSellerProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/seller`);
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}`, product);
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 