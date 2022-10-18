import { AuthService } from './../../_core/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ACCESS_TOKEN } from './../../_core/utils/configApp';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { dataTool } from 'echarts';

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
      console.log(result);

      if (result.accessToken) {
        this.token = `Bearer ${result.accessToken}`
        localStorage.setItem(ACCESS_TOKEN, this.token)
        if (localStorage.getItem(ACCESS_TOKEN)) {
          this.route.navigate(['dashboard'])
          this.noti.create(
            'success',
            'Đăng nhập thành công', ''
          )
        }
      } else {
        this.noti.create(
          'error',
          'không hợp lệ',
          'vui lòng kiểm tra lại thông tin tài khoản và mật khẩu'
        )
      }

    })
  }
}
