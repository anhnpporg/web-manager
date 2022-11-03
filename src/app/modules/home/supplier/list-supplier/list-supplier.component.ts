import { SupplierService } from './../../../../_core/services/supplier/supplier.service';
import { Supplier } from './../../../../_core/utils/interface';
import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.css']
})
export class ListSupplierComponent implements OnInit {

  suppliers: Supplier[] = []
  searchData: string = ''
  listsearch: any
  selectedProvince = 'searchID'
  loading: boolean = true;
  confirmModal?: NzModalRef;
  nameList = [
    { text: 'Còn hoạt động', value: true },
    { text: 'Đã bị chặn', value: false }
  ];
  nameFilterFn = (list: string[], item: any): boolean => list.some(value => item.isActive == value)
  constructor(
    private supplier: SupplierService,
    private router: Router,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.supplier.getSupplier().subscribe((result) => {
      console.log(result);

      this.suppliers = result
      this.loading = false
      this.listsearch = this.suppliers
    })
  }

  SearchOption(value: string) {
    this.selectedProvince = value
    console.log(this.selectedProvince);
  }

  getListSearch() {
    console.log(this.searchData);

    if (this.selectedProvince == "searchID") {
      this.listsearch = this.suppliers.filter(data => data.id.toString().includes(this.searchData.toLocaleLowerCase()))
    } else if (this.selectedProvince == "SearchName") {
      this.listsearch = this.suppliers.filter(data => data.name.toLocaleLowerCase().includes(this.searchData.toLocaleLowerCase()))
    }
  }

  clickBan(id: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Chặn',
      nzContent: 'Bạn có muốn chặn nhân viên này',
      nzOnOk: () => {
        this.supplier.isBan(id).subscribe(() => {
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
            console.log(currentUrl);
          });
        }, err => {
          console.log(err)

        })
      },
    });

  }

  clickUnBan(id: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Bỏ chặn',
      nzContent: 'Bạn có muốn bỏ chặn nhân viên này',
      nzOnOk: () => {
        // this.supplier.isUnBan(id).subscribe((rs: string) => {
        //   console.log('rs:', rs);
        //   let currentUrl = this.router.url;
        //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        //     this.router.navigate([currentUrl]);
        //     console.log(currentUrl);
        //   });
        // }, err => {
        //   console.log(err)
        // })
      },
    });
  }
}
