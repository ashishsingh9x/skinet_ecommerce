import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../../shared/models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  cart = signal<Cart | null>(null);

  getCart(id: string) {
    this.http.get<Cart>(this.baseUrl + 'cart?id=' + id).subscribe({
        next: cartResponse => this.cart.set(cartResponse) //setting cart response to signal
      }
    )
  }

  setCart(cart: Cart) {
    this.http.post<Cart>(this.baseUrl + 'cart', cart).subscribe({
        next: cartResponse => this.cart.set(cartResponse)
    })
  }
}
