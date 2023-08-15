import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})


export class ShopService {
  baseUrl = environment.apiUrl + 'products';

  constructor(private http: HttpClient) {}

  getProducts(shopParams: ShopParams) {
    
    let params = new HttpParams();

    if (shopParams.brandId !== 0)
      params = params.append('brandId', shopParams.brandId.toString());

    if (shopParams.typeId !== 0)
      params = params.append('typeId', shopParams.typeId.toString());

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageIndex.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());
    if (shopParams.search) params = params.append('search', shopParams.search);    
    return this.http.get<Pagination<Product[]>>(this.baseUrl, {
      params,
    });
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + '/' + id);
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + '/brands/all');
  }

  getTypes() {
    return this.http.get<Type[]>(this.baseUrl + '/types/all');
  }
}
