import { UserService } from './../../../../_core/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { use } from 'echarts';

@Component({
  selector: 'app-detail-staff',
  templateUrl: './detail-staff.component.html',
  styleUrls: ['./detail-staff.component.css']
})
export class DetailStaffComponent implements OnInit {

  id: string = '';
  avatar: string = ''
  dateOfBirth: string = ''
  phoneNumber: string = ''
  isMale: string = ''
  fullname: string = ''
  createdAt: string = ''
  subParam!: Subscription;

  newPassword: string = ''
  comfirmPassword: string = ''

  constructor(
    private route: Router,
    private atvRoute: ActivatedRoute,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.user.getProfilebyID(params['id']).subscribe((result) => {
        console.log(result)
        this.avatar = result?.avatar;
        this.dateOfBirth = result?.dateOfBirth;
        this.fullname = result?.fullname;
        this.isMale = result?.isMale;
        this.createdAt = result?.createdAt;
        this.phoneNumber = result?.phoneNumber;
      })
    }, err => {
      this.route.navigate(['/404'])
    });
  }

  changePassword() {
    let formdata = new FormData()
    formdata.append('newPassword', this.newPassword)
    formdata.append('confirmPassword', this.comfirmPassword)
    this.user.changePassword(this.id, formdata).subscribe((result) => {
      console.log(result);
    })
  }


}
