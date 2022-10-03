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

  // email: string = "";
  // password: string = "";

  constructor(
    private auth: AuthService,
    private noti: NzNotificationService,
    public translate: TranslateService
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
    this.auth.GoogleAuth();
  }



  createNotification(type: string): void {
    this.noti.create(
      type,
      'Invalid',
      'please! check your email or password'
    );
  }
}
