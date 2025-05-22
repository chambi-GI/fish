import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VariablesService } from '../public/variables.service';
import { Product, CreateProductDto, UpdateProductDto, ProductFilters } from '../../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private variables: VariablesService
  ) {
    this.apiUrl = `${environment.apiUrl}/products`;
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getProducts(filters?: ProductFilters): Observable<Product[]> {
    let params = new HttpParams();
    
    if (filters) {
      if (filters.categoryId) params = params.set('categoryId', filters.categoryId);
      if (filters.minPrice) params = params.set('minPrice', filters.minPrice.toString());
      if (filters.maxPrice) params = params.set('maxPrice', filters.maxPrice.toString());
      if (filters.isActive !== undefined) params = params.set('isActive', filters.isActive.toString());
      if (filters.search) params = params.set('search', filters.search);
      if (filters.sortBy) params = params.set('sortBy', filters.sortBy);
      if (filters.sortOrder) params = params.set('sortOrder', filters.sortOrder);
    }

    return this.http.get<Product[]>(this.apiUrl, { params });
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: CreateProductDto): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: UpdateProductDto): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadProductImage(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<{ url: string }>(`${this.apiUrl}/upload`, formData);
  }

  // Get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

 
  getMyProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/me`, {
      headers: this.getAuthHeaders()
    });
  }

  // Get products by seller ID
  getProductsBySeller(sellerId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/seller/${sellerId}`);
  }

  // Get products by category
  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  // Toggle product active status (Admin only)
  toggleProductActive(id: string): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}/toggle-active`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete a product image
  deleteProductImage(imageId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/image/${imageId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getTrendingProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/trending`);
  }

  // Get best-selling products
  getBestSellers(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/best-sellers`);
  }
}
