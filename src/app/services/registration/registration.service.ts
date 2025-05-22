import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VariablesService } from '../../services/public/variables.service';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  // https://fishmarket.juafaida.com/v1/auth/register/seller
  public url: string;
   
     constructor(private http: HttpClient, public variable: VariablesService) { 
       this.url = this.variable.baseUrl;
     }

 registerSeller(data:any) {
    return this.http.post<any>(`${this.url}auth/register/seller`,data); 
  }
  registerBuyer(data:any) {
    return this.http.post<any>(`${this.url}auth/authenticate`,data); 
  }
}

