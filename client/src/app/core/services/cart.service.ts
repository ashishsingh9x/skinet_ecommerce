import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart, CartItem } from '../../shared/models/cart';
import { Product } from '../../shared/models/product';

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

  // addItemToCart can accept Product from shop page or Cart Item from product detail page
  addItemToCart(item: CartItem | Product, quantity = 1) {
    // if cart is not present in cart signal service then create new cart 
    const cart = this.cart() ?? this.createCart();  
    // At this point we need to work with cart item or product item, CartItem and Product are similar but not same.
    if(this.isProduct(item)) {
      // Mapping Product item to cart item to work with cart item rather than working with cart item or product item
      item = this.mapProductToCartItem(item); 
    }

    cart.items = this.addOrUpdateItem(cart.items, item, quantity);
    // once update quantity, we update our signal.
    this.setCart(cart);
  }

  private addOrUpdateItem(items: CartItem[], item: CartItem, quantity: number): CartItem[] {
    const index = items.findIndex(x => x.productId === item.productId); // check if item exist in our basket
    if (index === -1) { // not found in basket items 
      item.quantity = quantity; //update only quantity, as other property are already initialised 
      items.push(item);
    }
    else {
      items[index].quantity += quantity; // increase the amount in basket
    }
    return items;
  }

  private mapProductToCartItem(item: Product): CartItem {
    return {
      productId: item.id,
      productName: item.name,
      price: item.price,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      brand: item.brand,
      type: item.type
    }
  }

  // returning item is product or not
  private isProduct(item: CartItem | Product): item is Product {
    // the idea of this if the item has ID property bcuz product has ID property but item cart does not.
    // then if that's not equal to undefined, then item is product, and is product is going to return true.
    return (item as Product).id !== undefined; 
  }

  private createCart(): Cart {
    const cart = new Cart();
    localStorage.setItem('cart_id', cart.id);
    return cart;
  }
}
