import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl: string = "https://localhost:7006/api/";
  private http = inject(HttpClient);
  brands: string[] = [];
  types: string[] = [];

  getProducts() {
    return this.http.get<Pagination<Product>>(this.baseUrl + 'products?pageSize=20');
  }

  // as services are singleton, and components get disposed when we have routing, we will 
  // call & store brands and types only once.
  getBrands() {
    if (this.brands.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'products?brands').subscribe({
      next: response => this.brands = response
    })
  }

  getTypes() {
    if (this.types.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'products?types').subscribe({
      next: response => this.types = response
    })
  }
}
