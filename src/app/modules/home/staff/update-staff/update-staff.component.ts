import { UserService } from 'src/app/_core/services/user/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ImageService } from 'src/app/_core/services/image/image.service';
import { getStorage, ref } from 'firebase/storage';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.css']
})
export class UpdateStaffComponent implements OnInit {

  @Input() staffID: number = 0
  gender: boolean = true
  imageURL: string = ''
  isVisibleChangeInfo: boolean = false
  path: string = ''
  nameImage: string = ''

  updateInfo = {
    avartar: '',
    fullName: '',
    dateOfBirth: '',
    phoneNumber: '',
    isMale: ''
  }


  constructor(
    private GetImg: ImageService,
    private storageImage: AngularFireStorage,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log(this.staffID);

    this.userService.getProfilebyID(this.staffID).subscribe((result) => {
      console.log(result.data);

    })


  }

  showModalChangeInfo() {
    this.isVisibleChangeInfo = true
  }

  handleChangeInfoOk() {
    this.isVisibleChangeInfo = false
  }

  handleChangeInfoCancel() {
    this.isVisibleChangeInfo = false
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
