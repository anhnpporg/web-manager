import { UserService } from './../../../../_core/services/user/user.service';
// import { CustomValidators } from './../../../../providers/CustomValidators';
import { ImageService } from './../../../../_core/services/image/image.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, ref } from "firebase/storage";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css']
})
export class CreateStaffComponent implements OnInit {

  path: string = '';
  nameImage: string = '';
  imageURL: string = '';

  StaffData = this.fb.group({
    loginName: ['', [Validators.required, Validators.pattern('^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$')]],
    password: ['', [Validators.required]],
    passwordConfirm: ['', [Validators.required]],
    fullname: ['', [Validators.required]],
    phoneNumber: [''],
    dob: [''],
    isMale: [true],
    avatar: ['']
  })
  get statusError() {
    return this.StaffData.controls
  }
  constructor(
    private storageImage: AngularFireStorage,
    private GetImg: ImageService,
    private fb: FormBuilder,
    private user: UserService
  ) {

  }
  ngOnInit(): void {
  }

  onSubmit() {
    var formData: any = new FormData();
    this.StaffData.value.avatar = this.imageURL
    
    formData.append(
      "loginName", this.StaffData.value.loginName
    )
    
    this.user.createStaff(formData).subscribe((rs)=>{
      console.log(rs);
    })
  }

  async uploadImage($event: any) {
    this.path = $event.target.files[0];
    console.log(this.path);
    await (this.nameImage = "image" + Math.random())
    await this.storageImage.upload(this.nameImage, this.path);
    // await this.receiveURL(this.nameImage);
    const storage = getStorage();
    const pathReference = ref(storage, 'images/' + this.nameImage);
    console.log('path', pathReference);
    this.GetImg.readlink(this.nameImage).subscribe((result: any) => {
      console.log(result.downloadTokens);
      this.imageURL = "https://firebasestorage.googleapis.com/v0/b/utnhandrug.appspot.com/o/" + this.nameImage + "?alt=media&token=" + result.downloadTokens
    })
  }
}
