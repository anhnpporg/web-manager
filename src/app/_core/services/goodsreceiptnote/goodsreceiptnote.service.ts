import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN, DOMAIN } from '../../utils/configApp';

@Injectable({
  providedIn: 'root'
})
export class GoodsreceiptnoteService {
  token = localStorage.getItem(ACCESS_TOKEN);
  headers: any;
  constructor(
    private httpClient: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'authorization': this.token!,
      'accept': '*/*',
      'Access-Control-Allow-Origin': '*'})
  }

  // GoodsReceiptNotes
  getGoodsReceiptNotes(id: number):Observable<any> {
    return this.httpClient.get(DOMAIN + `batch-management/batches/${id}/goods-receipt-note`, { headers: this.headers })
  }


  // Invoices
  getInvoices(id:number):Observable<any> {
    return this.httpClient.get(DOMAIN + `batch-management/batches/${id}/goods-receipt-note`, { headers: this.headers })
  }
}
