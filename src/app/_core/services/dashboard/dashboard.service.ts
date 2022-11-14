import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN, DOMAIN } from '../../utils/configApp';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  token = localStorage.getItem(ACCESS_TOKEN);
  headers: any;
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      authorization: this.token!,
      accept: '*/*',
      'Access-Control-Allow-Origin': '*',
    });
  }

  getRecentSales(
    day: boolean,
    month: boolean,
    year: boolean,
    size: number
  ): Observable<any> {
    return this.httpClient.get(
      DOMAIN +
        `dashboard/recent-sales?byDay=${day}&byMonth=${month}&byYear=${year}&size=${size}`,
      { headers: this.headers }
    );
  }

  getTopSelling(
    day: boolean,
    month: boolean,
    year: boolean,
    size: number
  ): Observable<any> {
    return this.httpClient.get(
      DOMAIN +
        `dashboard/top-selling?byDay=${day}&byMonth=${month}&byYear=${year}&size=${size}`,
      { headers: this.headers }
    );
  }
}
