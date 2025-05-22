import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  // Get all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  // Get a specific category by ID
  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  // Create a new category
  createCategory(category: CreateCategoryDto): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  // Update a category
  updateCategory(id: string, category: UpdateCategoryDto): Observable<Category> {
    return this.http.patch<Category>(`${this.apiUrl}/${id}`, category);
  }

  // Delete a category
  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
