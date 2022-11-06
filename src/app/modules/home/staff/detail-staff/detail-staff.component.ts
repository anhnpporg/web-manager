import { UserService } from './../../../../_core/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { use } from 'echarts';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ImageService } from 'src/app/_core/services/image/image.service';
import { getStorage, ref } from 'firebase/storage';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-detail-staff',
  templateUrl: './detail-staff.component.html',
  styleUrls: ['./detail-staff.component.css']
})
export class DetailStaffComponent implements OnInit {

  path: string = '';
  nameImage: string = '';
  imageURL: string = './assets/img/avatar.png';
  isVisibleChangePassword: boolean = false
  isVisibleChangeInfo : boolean = false
  id: string = '';
  userAccount: string =''
  avatar: string = ''
  dateOfBirth: string = ''
  phoneNumber: string = ''
  isMale: string = ''
  fullname: string = ''
  createdAt: string = ''
  email: string =''
  newAvatar: string =''
  newDateOfBirth: string = ''
  newPhoneNumber: string = ''
  newIsMale: string = ''
  newFullname: string = ''

  checkError: boolean = false
  subParam!: Subscription;



  newPassword: string = ''
  comfirmPassword: string = ''

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private atvRoute: ActivatedRoute,
    private user: UserService,
    private storageImage: AngularFireStorage,
    private GetImg: ImageService,
    private notification: NzNotificationService,
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
        this.email = result?.email
        this.userAccount = result?.userAccount
      })
    }, err => {
      this.route.navigate(['/404'])
    });
  }

  // change password of staff
  changePassword() {

  }

  showModalChangePassword(): void {
    this.isVisibleChangePassword = true;
  }

  handleChangePasswordOk(){

  }

  handleChangePasswordCancel(){
    this.isVisibleChangePassword = false;
  }


  // change information of staff
  changeInfo(){

  }

  showModalChangeInfo(): void {
    this.isVisibleChangeInfo = true;
  }

  handleChangeInfoOk(){

  }

  handleChangeInfoCancel(){
    this.isVisibleChangeInfo = false;
  }

  async uploadImage($event: any) {
    this.path = $event.target.files[0];
    console.log(this.path);
    await (this.nameImage = 'image' + Math.random());
    await this.storageImage.upload(this.nameImage, this.path);
    // await this.receiveURL(this.nameImage);
    const storage = getStorage();
    const pathReference = ref(storage, 'images/' + this.nameImage);
    console.log('path', pathReference);
    this.GetImg.readlink(this.nameImage).subscribe((result: any) => {
      console.log(result.downloadTokens);
      this.imageURL =
        'https://firebasestorage.googleapis.com/v0/b/utnhandrug.appspot.com/o/' +
        this.nameImage +
        '?alt=media&token=' +
        result.downloadTokens;
    });
  }

}
