import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
    private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadImage(file: File, folder: string = 'images'): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.apiUrl}/v1/uploads/${folder}`, formData)
      .pipe(
        map(response => response.url) // Adjust if your API returns a different property
      );
  }
} 