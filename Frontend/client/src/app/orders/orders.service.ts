import { environment } from './../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../shared/models/order';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  getOrdersList() {
    let params = new HttpParams();
    params = params.append('clientId', this.accountService.clientId);
    return this.http.get<Order[]>(this.baseUrl + 'orders/client', { params });
  }

  getOrder(id: number) {
    return this.http.get<Order>(this.baseUrl + 'orders/' + id);
  }
}
