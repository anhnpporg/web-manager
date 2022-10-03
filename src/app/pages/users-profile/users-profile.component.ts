import { UserService } from './../../_core/services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  avatar: string = ''
  name: string = ''
  phone: string = ''
  gender: string = ''
  email: string = ''
  birthday: string = ''
  address: string = ''

  constructor(
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.user.getProfile().subscribe((result) => {
      console.log(result)
      this.avatar = result?.avatar;
      this.phone = result?.phoneNumber;
      this.name = result?.fullname;
      this.birthday = result?.dateOfBirth
      this.gender = result?.genderId
    })
  }

}
