import { UserService } from './../../../../_core/services/user/user.service';
// import { CustomValidators } from './../../../../providers/CustomValidators';
import { ImageService } from './../../../../_core/services/image/image.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, ref } from 'firebase/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css'],
})
export class CreateStaffComponent implements OnInit {
  path: string = '';
  nameImage: string = '';
  imageURL: string = '';

  StaffData = this.fb.group({
    loginName: ['',[Validators.required,Validators.pattern('^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'),],],
    password: ['', [Validators.required]],
    passwordConfirm: ['', [Validators.required],],
    fullname: ['', [Validators.required]],
    phoneNumber: ['',[Validators.required],Validators.pattern('(\\+84|0)[0-9]{9}')],
    dob: [''],
    isMale: [true],
    avatar: [''],
  },
  {
    // validators: this.mustMatch('password','passwordConfirm')
  }
  );

  get statusError() {
    return this.StaffData.controls;
  }
  constructor(
    private storageImage: AngularFireStorage,
    private GetImg: ImageService,
    private fb: FormBuilder,
    private user: UserService
  ) {}
  ngOnInit(): void {}

  onSubmit() {
    var formData: any = new FormData();
    this.StaffData.value.avatar = this.imageURL;
    var date = this.StaffData.value.dob;
    formData.append('loginName', this.StaffData.value.loginName);
    formData.append('password', this.StaffData.value.password);
    formData.append('passwordConfirm', this.StaffData.value.passwordConfirm);
    formData.append('fullname', this.StaffData.value.fullname);
    formData.append('phoneNumber', this.StaffData.value.phoneNumber);
    formData.append('dob', date);
    formData.append('isMale', this.StaffData.value.isMale);
    formData.append('avatar', this.StaffData.value.avatar);

    this.user.createStaff(formData).subscribe((rs) => {
      console.log(rs);
    });
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
  mustMatch(password:any, passwordConfirm:any){
    return (formGroup:FormGroup)=>{
      const passwordControl = formGroup.controls[password];
      const passwordConfirmControl = formGroup.controls[passwordConfirm];
      if(passwordConfirmControl.errors && !passwordConfirmControl.errors['mustMatch']){
        return;
      }
      if(passwordControl.value!==passwordConfirmControl.value){
        passwordConfirmControl.setErrors({mustMatch:true});
      }else{
        passwordConfirmControl.setErrors(null);
      }
    }
  }
}
