import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map, of, take } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Client } from '../shared/models/client';
import { Address } from '../shared/models/address';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  public currentUSerSource = new ReplaySubject<Client | null>(1);
  currentUSer$ = this.currentUSerSource.asObservable();
  clientId = 0;
  constructor(private http: HttpClient, private router: Router) {}

  loadCurrentUSer(token: string | null) {
    if (token === null) {
      this.currentUSerSource.next(null);
      return of(null);
    }
    if (token === 'undefined') {
      localStorage.removeItem('token');
      this.currentUSerSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<Client>(this.baseUrl + 'auth/', { headers }).pipe(
      map((client) => {
        if (client) {
          localStorage.setItem('token', client.token);
           client = this.formattingAddress(client)
           console.log(client);
           
          this.currentUSerSource.next(client);
          this.clientId = client.clientId;
          return client;
        } else {
          return null;
        }
      })
    );
  }

  login(values: any) {
    return this.http.post<Client>(this.baseUrl + 'auth/login', values).pipe(
      map((client) => {
        const formattedClient = this.formattingAddress(client)
        localStorage.setItem('token', client.token);
        this.currentUSerSource.next(formattedClient);

      })
    );
  }

  register(values: any) {
    return this.http.post<Client>(this.baseUrl + 'auth/register', values).pipe(
      map((client) => {
        localStorage.setItem('token', client.token);
        this.currentUSerSource.next(client);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUSerSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'auth/emailExists?email=' + email);
  }


  formattingAddress(client:any):Client{
    const formattedClient:Client = {

      clientId: client.clientId,
      addressId: client.addressId,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      address: {
        addressId : client.addressId,
        country: client.country,
        city : client.city,
        street : client.street,
        zipcode: client.zipcode
      },
      token: client.token,
  
    }
  
    return formattedClient;
  }

  updatedUserAddress(address: Address, addressId: number) {
    return this.http.put<Address>(this.baseUrl + 'auth/client/address', {
      address,
      addressId,
    })
  }
  postUserAddress(address: Address, clientId: number) {
    console.log(address, clientId);
    return this.http.post<Address>(this.baseUrl + 'auth/client/address', {
      address,
      clientId,
    })
  }


}
