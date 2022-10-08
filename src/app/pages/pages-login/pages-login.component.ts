import { AuthService } from './../../_core/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ACCESS_TOKEN, IS_ADMIN } from './../../_core/utils/configApp';
import { Router } from '@angular/router';
import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  token: string = ''

  constructor(
    private auth: AuthService,
    private noti: NzNotificationService,
    public translate: TranslateService,
    private route: Router
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  switchLanguage(lang: string) {
    this.translate.use(lang)
  }

  ngOnInit(): void {
  }

  login() {
    var formData: any = new FormData();
    formData.append(
      'username', this.username
    )
    formData.append(
      'password', this.password
    )
    console.log(this.username + "-" + this.password)

    this.auth.login(formData).subscribe((result: any) => {

      if (result.accessToken) {
        this.token = `Bearer ${result.accessToken}`
        localStorage.setItem(ACCESS_TOKEN, this.token)
        if (localStorage.getItem(ACCESS_TOKEN)) {
          this.route.navigate(['dashboard'])
        }
      }

    })
  }



  createNotification(type: string): void {
    this.noti.create(
      type,
      'Invalid',
      'please! check your email or password'
    );
  }
}
