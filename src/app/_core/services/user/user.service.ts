import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ACCESS_TOKEN, DOMAIN } from './../../utils/configApp';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token = localStorage.getItem(ACCESS_TOKEN);
  headers: any;
  constructor(
    private httpClient: HttpClient
  ) {
    console.log(this.token);
    this.headers = new HttpHeaders({ 'authorization': this.token! });
  }


  isBan(id: number): Observable<any> {
    return this.httpClient.put(DOMAIN + `user-management/users/ban/${id}`, {}, { headers: this.headers });
  }

  isUnBan(id: number): Observable<any> {
    return this.httpClient.put(DOMAIN + `user-management/users/unban/${id}`, {}, { headers: this.headers });
  }

  //Manager

  getManager(index: string, size: string): Observable<any> {
    console.log(this.token!)
    return this.httpClient.get(DOMAIN + `user-management/managers?pageIndex=1&pageSize=5`, { headers: this.headers });
  }
  getProfile(): Observable<any> {
    return this.httpClient.get(DOMAIN + `user-management/auth/user/profile`, { headers: this.headers })
  }

  // Staff
  getStaffs(): Observable<any> {
    return this.httpClient.get(DOMAIN + `user-management/staffs`, { headers: this.headers })
  }
  createStaff(staffData: FormData): Observable<any> {
    return this.httpClient.post(DOMAIN + `user-management/staffs`, { staffData }, { headers: this.headers })
  }
  // Customer


}
