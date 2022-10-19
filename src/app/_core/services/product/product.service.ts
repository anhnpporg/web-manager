import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ACCESS_TOKEN, DOMAIN } from './../../utils/configApp';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  token = localStorage.getItem(ACCESS_TOKEN);
  headers: any;
  constructor(
    private httpClient: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'authorization': this.token!,
      'accept': '*/*',
      'Access-Control-Allow-Origin': '*'
    });
  }

  getAllProduct(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'product-management/products', { headers: this.headers })
  }


  //activesubstance

  getAllActiveSubstance(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'active-substance-management/active-substances', { headers: this.headers })
  }
  createActiveSubstance(name: FormData): Observable<any> {
    return this.httpClient.post(DOMAIN + 'active-substance-management/active-substances', name, { headers: this.headers })
  }
  deleteActiveSubstance(id: number): Observable<any> {
    return this.httpClient.patch(DOMAIN + 'active-substance-management/active-substances', {}, { headers: this.headers })
  }

  //product

  getAllCategory(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'shelves-management/shelves', { headers: this.headers })
  }
  createCategory(name: FormData): Observable<any> {
    return this.httpClient.post(DOMAIN + 'shelves-management/shelves', name, { headers: this.headers })
  }
  deleteCategory(id: number): Observable<any> {
    return this.httpClient.patch(DOMAIN + 'shelves-management/shelves', id, { headers: this.headers })
  }

  //Shelf
  getAllShelf(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'shelves-management/shelves', { headers: this.headers })
  }
  


}
