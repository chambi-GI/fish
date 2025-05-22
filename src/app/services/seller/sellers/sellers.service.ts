import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariablesService } from '../../public/variables.service';

@Injectable({
  providedIn: 'root'
})
export class SellersService {

    public url: string;
  
    constructor(private http: HttpClient, public variable: VariablesService) { 
      this.url = this.variable.baseUrl;
    }
    createSeller(data: any) {
      return this.http.post<any>(`${this.url}sellers`,data);
    }
    getSellersList() {
      return this.http.get<any>(`${this.url}sellers`); 
    }

    getSellerProfile() {
      return this.http.get<any>(`${this.url}sellers/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
      });
    }

    getSellerById(id: string) {
      return this.http.get<any>(`${this.url}sellers/${id}`);
    }
    createSellerLisence(id:any,data: any) {
      return this.http.post<any>(`${this.url}sellers/${id}/license`,data);
    }
   
      updateSellerProfile(id: string, data: any) {
        return this.http.patch<any>(`${this.url}sellers/${id}`, data);
      }

      adminUpdateSellerProfile(id: string, data: any) {
        return this.http.patch<any>(`${this.url}sellers/${id}/admin`, data);
      }
    
      verifySellerAccount(id: string, data: any) {
        return this.http.patch<any>(`${this.url}sellers/${id}/verify`, data);
      }
      unverifySellerAccount(id: string, data: any) {
        return this.http.patch<any>(`${this.url}sellers/${id}/unverify`, data);
      }

      updateLisence(id: string, data: any) {
        return this.http.patch<any>(`${this.url}sellers/license/${id}`, data);
      }

      getDashboardData() {
        return this.http.get<any>(`${this.url}seller/dashboard`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      }

      // getProducts() {
      //   return this.http.get<any>('https://fishmarket.juafaida.com/v1/seller/products', {
      //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      //   });
      // }
      getSellerProducts(){
        return this.http.get<any>(`${this.url}products/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

      }

      getAnalytics() {
        return this.http.get<any>(`${this.url}seller/analytics`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }

      createProduct(data: any) {
        return this.http.post<any>(`${this.url}products`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }

      // getSellerProfile() {
      //   return this.http.get<any>(`${this.url}sellers/me`, {
      //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      //   });
      // }

      deleteProduct(productId: string) {
        return this.http.delete<any>(`${this.url}products/${productId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }

      updateProduct(productId: string, data: any) {
        return this.http.patch<any>(`${this.url}products/${productId}`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
  }