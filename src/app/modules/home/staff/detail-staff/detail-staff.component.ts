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
import { ModalOptions, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-detail-staff',
  templateUrl: './detail-staff.component.html',
  styleUrls: ['./detail-staff.component.css']
})
export class DetailStaffComponent implements OnInit {

  path: string = '';
  nameImage: string = '';
  imageURL: string = './assets/img/avatar.png';
  isVisibleChangeInfo : boolean = false
  id: number = 1
  userAccount: string =''
  avatar: string = ''
  dateOfBirth: string = ''
  phoneNumber: string = ''
  isMale: boolean = true
  fullname: string = ''
  createdAt: string = ''
  email: string =''

  newAvatar: string =''
  newDateOfBirth: string = ''
  newPhoneNumber: string = ''
  newIsMale:  boolean = true
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
    private modal: NzModalService
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
        this.id = result?.userId
      })
    }, err => {
      this.route.navigate(['/404'])
    });
  }

  // change password of staff
  onSubmit(){
    this.modal.create({
      nzTitle: 'Thay đổi mật khẩu nhân viên',
      nzContent: 'Bạn có chắc chắn đặt lại mật khẩu cho nhân viên không ?',
      nzClosable: false,
      nzOnOk: () => {
        console.log(this.id)
        this.user.changePasswordforStaff(this.id).subscribe(
          (rs: any) => {
            console.log(rs);
            // this.notification.create('success', rs.message, '');
            // this.route.navigate(['dashboard/detail-staff/'+this.id])
            this.modal.success({
              nzTitle: rs.message,
              nzContent: rs.data,
              nzWidth: 550,
              nzOnOk: () => {this.route.navigate(['dashboard/detail-staff/'+this.id])
              this.notification.create('success', rs.message, '');
            }})
          },
          (err: { error: { message: string } }) => {
            console.log(err);
            this.notification.create(
              'error',
              'Đặt lại mật khẩu không thành công',
              err.error.message
            );
          }
        );
      },
    });
  }

  // change information of staff

  showModalChangeInfo(): void {
    this.isVisibleChangeInfo = true;
  }

  handleChangeInfoOk(){
    this.modal.create({
      nzTitle: 'Thay đổi thông tin cá nhân',
      nzContent: 'Bạn có chắc chắn thay đổi thông tin không ?',
      nzClosable: false,
      nzOnOk: () => {
        var newInfo: any = new FormData();
        newInfo.append('avatar', this.newAvatar);
        newInfo.append('fullName', this.newFullname)
        newInfo.append('dateOfBirth', this.newDateOfBirth)
        newInfo.append('phoneNumber', this.newPhoneNumber)
        newInfo.append('isMale', this.newIsMale)
        console.log(newInfo);
        this.user.changeInfoStaff(this.id,newInfo).subscribe(
          (rs: any) => {
            console.log(rs);
            this.notification.create('success', rs.message, '');
            let currentUrl = this.route.url;
            this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.route.navigate([currentUrl]);
          console.log(currentUrl);
        });
            this.isVisibleChangeInfo = false
          },
          (err: { error: { message: string } }) => {
            console.log(err);

            this.notification.create(
              'error',
              'Đổi thông tin không thành công',
              err.error.message
            );
          }
        );
      },
    });
  }

  handleChangeInfoCancel(){
    this.isVisibleChangeInfo = false;
  }

  async uploadImage($event: any) {
    this.path = $event.target.files[0];
    console.log(this.path);
    await (this.newAvatar = 'image' + Math.random());
    await this.storageImage.upload(this.newAvatar, this.path);
    // await this.receiveURL(this.nameImage);
    const storage = getStorage();
    const pathReference = ref(storage, 'images/' + this.newAvatar);
    console.log('path', pathReference);
    this.GetImg.readlink(this.newAvatar).subscribe((result: any) => {
      console.log(result.downloadTokens);
      this.imageURL =
        'https://firebasestorage.googleapis.com/v0/b/utnhandrug.appspot.com/o/' +
        this.newAvatar +
        '?alt=media&token=' +
        result.downloadTokens;
    });
  }

}
