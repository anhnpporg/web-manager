import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PROFILE, USER_NAME, AVATAR, IDTOKEN, DOMAIN, IS_ADMIN, ACCESS_TOKEN } from './../../utils/configApp';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { GoogleAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLogin = false;
  token:string = ''

  constructor(
    private firebaseAuth: AngularFireAuth,
    private route: Router,
    private httpClient: HttpClient
  ) { }

  // checkLogin(idToken: string): Observable<any> {
  //   const headers = new HttpHeaders({ 'idToken':  idToken})
  //   console.log("headers",headers);
  //   return this.httpClient.post(DOMAIN + `manager/login`, {headers});
  // }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }


  async AuthLogin(provider: any) {

    return this.firebaseAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        console.log(result);
        localStorage.setItem(PROFILE, JSON.stringify(result?.additionalUserInfo?.profile));
        localStorage.setItem(USER_NAME, result?.additionalUserInfo?.profile.family_name);
        localStorage.setItem(AVATAR, result?.additionalUserInfo?.profile.picture);
        console.log(result.user?.getIdToken());
        result.user?.getIdToken().then((idToken: any) => {
          let headers = {
            'accept': 'text/plain',
            'idToken': idToken
          }
          this.httpClient.post(DOMAIN + `auth/managers/login`, {}, { headers }).subscribe((rs: any) => {
            this.token = `Bearer ${rs.accessToken}`
            console.log(this.token);  
            localStorage.setItem(ACCESS_TOKEN, this.token)
            if (localStorage.getItem(ACCESS_TOKEN)) {
              this.route.navigate(['dashboard'])
            }
          }, err => {
            console.log('er:', err)
          })
        })

      })
      .catch((error) => {
        console.log(error);
        this.route.navigate(['']);
      });
  }

  logout() {
    this.firebaseAuth.signOut().then(() => {
      localStorage.clear();
      this.route.navigate(['']);
    }, err => {
      console.log(err.message);
    })
  }


}
