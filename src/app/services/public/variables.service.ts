import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  public baseUrl: string = 'https://fishmarket.juafaida.com/v1/';
  constructor() { }
}
