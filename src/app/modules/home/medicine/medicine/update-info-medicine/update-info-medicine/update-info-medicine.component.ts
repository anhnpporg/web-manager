import { ProductService } from 'src/app/_core/services/product/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-update-info-medicine',
  templateUrl: './update-info-medicine.component.html',
  styleUrls: ['./update-info-medicine.component.css']
})
export class UpdateInfoMedicineComponent implements OnInit {

  @Input() productId: number = 0
  isVisibleChangeInfo: boolean = false
  isUseDose: boolean = true
  isManagedInBatches: boolean = true
  confirmModal?: NzModalRef;

  updateInfoProduct = {
    drugRegistrationNumber:'',
    name: '',
    brandId: '',
    shelfId: '',
    routeOfAdministrationId: '',
    mininumInventory:'',
  }
  constructor(
    private modal: NzModalService,
    private notification: NzNotificationService,
    private router: Router,
    private product: ProductService
  ) { }

  ngOnInit(): void {
    console.log(this.productId)
    this.product.getProductById(this.productId).subscribe((result)=>{
      console.log(result.data)
      this.updateInfoProduct.drugRegistrationNumber = result.data.drugRegistrationNumber
      this.updateInfoProduct.name = result.data.name
      this.updateInfoProduct.brandId = result.data.brand.id
      this.updateInfoProduct.shelfId = result.data.shelf.id
      this.updateInfoProduct.routeOfAdministrationId = result.data.routeOfAdministration.id
      this.isManagedInBatches = result.data.isManagedInBatches
      this.isUseDose = result.data.isUseDose
    })
  }

  showModalChangeInfo() {
    this.isVisibleChangeInfo = true
  }

  handleChangeInfoOk() {
    this.isVisibleChangeInfo = false

    let dataform = new FormData()
      // dataform.append('avartar', this.updateInfo.avartar),
      // dataform.append('fullName', this.updateInfo.fullName),
      // dataform.append('dateOfBirth', this.updateInfo.dateOfBirth),
      // dataform.append('phoneNumber', this.updateInfo.phoneNumber),
      // dataform.append('isMale', this.updateInfo.isMale + ''),

      this.confirmModal = this.modal.confirm({
        nzTitle: 'Thay đổi thông tin nhân viên',
        nzContent: 'Bạn có muốn thay đổi thông tin nhân viên này không ?',
        nzOkText: 'Có',
        nzOnOk: () => {
          // this.product.upda(this.staffID, dataform).subscribe((result) => {
          //   console.log(result);
          //   this.notification.create(
          //     'success',
          //     result.message,
          //     ''
          //   );
          //   let currentUrl = this.router.url;
          //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          //     this.router.navigate([currentUrl]);
          //     console.log(currentUrl);
          //   });
          // }, err => {
          //   this.notification.create(
          //     'error',
          //     err.error.message,
          //     ''
          //   );
          // })
        }
      });
  }

  handleChangeInfoCancel() {
    this.isVisibleChangeInfo = false
  }

  changeInfo() {
    console.log(this.updateInfoProduct);

  }
}
