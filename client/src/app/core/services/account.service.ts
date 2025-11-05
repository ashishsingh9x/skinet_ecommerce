import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Address, User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null); //null inside bracket is initial value of user or any type.

  login(values: any) {
    let params = new HttpParams();
    this.http.post<User>(this.baseUrl + 'account/login', values, { params });
  }

  register(values: any) {
    this.http.post(this.baseUrl + 'account/register', values);
  }

  getUserInfo() {
    return this.http.get<User>(this.baseUrl + 'account/user-info').subscribe({
      next: user => this.currentUser.set(user)
    })
  }

  logout() {
    return this.http.post(this.baseUrl + 'account/logout', {});
  }

  updateAddress(address: Address) {
    this.http.post(this.baseUrl + 'account/address', address);
  }
}
