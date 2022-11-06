import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { ProductService } from './../../../../../_core/services/product/product.service';
import { Customer } from 'src/app/_core/utils/interface';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medicine-category',
  templateUrl: './medicine-category.component.html',
  styleUrls: ['./medicine-category.component.css']
})
export class MedicineCategoryComponent implements OnInit {

  value: string = '127381'
  searchData: string = ''
  listData: any[] = []
  listsearch: any
  selectedProvince = 'searchID'
  loading: boolean = true;
  confirmModal?: NzModalRef;
  activeSubstanceName: string = ''
  checkError: boolean = false
  isVisible: boolean = false
  nameList = [
    { text: 'Hoạt động', value: true },
    { text: 'Ngừng hoạt động', value: false }
  ];
  nameFilterFn = (list: string[], item: any): boolean => list.some(value => item.isActive == value)

  constructor(
    private product: ProductService,
    private router: Router,
    private modal: NzModalService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {

    this.product.getAllCategory().subscribe((result: any[]) => {
      console.log(result);

      this.listData = result
      this.loading = false
      this.listsearch = this.listData
    })
  }

  detail(id: number,name:string) {
    this.router.navigate(['dashboard/detail-category/' + id],{queryParams: {}});

  }

  SearchOption(value: string) {
    this.selectedProvince = value
    console.log(this.selectedProvince);
  }

  getListSearch() {
    console.log(this.searchData);

    if (this.selectedProvince == "searchID") {
      this.listsearch = this.listData.filter(data => data.id.toString().includes(this.searchData.toLocaleLowerCase()))
    } else if (this.selectedProvince == "SearchName") {
      this.listsearch = this.listData.filter(data => data.name.toLocaleLowerCase().includes(this.searchData.toLocaleLowerCase()))
    }
  }
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    if (this.activeSubstanceName == '') {
      this.checkError = true
    } else {
      var formdata = new FormData()
      formdata.append('name', this.activeSubstanceName);
      this.isVisible = false;

      this.product.createCategory(formdata).subscribe((result: any) => {
        this.notification.create(
          'success',
          'Tạo phân loại thuốc mới thành công', ''
        )
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
          console.log(currentUrl);
        });
      }, (err: any) => {
        this.notification.create(
          'error',
          'Tạo phân loại thuốc mới thất bại', ''
        )
      })
    }
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  deleteBrand(id: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Ngừng hoạt động',
      nzContent: 'Bạn có muốn cho kệ hàng này ngừng hoạt động',
      nzOnOk: () => {
        this.product.deleteCategory(id).subscribe(() => {
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
            console.log(currentUrl);
          });
        }, (err: any) => {
          console.log(err)

        })
      },
    });
  }

}
