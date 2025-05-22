import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageUploadService {
  private cloudName = 'YOUR_CLOUD_NAME'; // TODO: Replace with your Cloudinary cloud name
  private uploadPreset = 'YOUR_UNSIGNED_UPLOAD_PRESET'; // TODO: Replace with your unsigned upload preset

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    return this.http.post(url, formData);
  }
} 