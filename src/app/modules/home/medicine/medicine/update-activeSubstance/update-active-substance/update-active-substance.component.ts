import { ActiveSubstances } from './../../../../../../_core/utils/interface';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductService } from 'src/app/_core/services/product/product.service';

@Component({
  selector: 'app-update-active-substance',
  templateUrl: './update-active-substance.component.html',
  styleUrls: ['./update-active-substance.component.css']
})
export class UpdateActiveSubstanceComponent implements OnInit {

  @Input() productId: number = 0
  @Input() listActiveSubstance: any[] = []
  activeSubstance: any[] = []
  listNew: any[] = []
  confirmModal?: NzModalRef;
  isVisibleChangeInfo: boolean = false
  constructor(
    private notification: NzNotificationService,
    private modal: NzModalService,
    private product: ProductService,
    private router : Router
  ) { }

  ngOnInit(): void {
    console.log(this.productId)
    console.log(this.listActiveSubstance)
    this.product.getAllActiveSubstance().subscribe((result)=>{
      this.activeSubstance = result.data
      for (let i = 0; i < this.activeSubstance.length; i++) {
        for (let j = 0; j < this.listActiveSubstance.length; j++) {
            if(this.activeSubstance[i].id == this.listActiveSubstance[j].id){
              this.activeSubstance.splice(i,1)
            }
        }
      }
      console.log(this.activeSubstance)
    })
  }

  showModalChangeInfo() {
    this.isVisibleChangeInfo = true
  }

  handleChangeInfoOk() {
    this.isVisibleChangeInfo = false
      this.confirmModal = this.modal.confirm({
        nzTitle: 'Thay đổi thông tin sản phẩm',
        nzContent: 'Bạn có muốn thay đổi thông tin sản phẩm này không ?',
        nzOkText: 'Có',
        nzOnOk: () => {
          // this.product.updateInfoProduct(this.productId, dataform).subscribe((result) => {
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
    console.log(this.listNew);

  }

}
