import { UserService } from './../../../../_core/services/user/user.service';
import { IS_ADMIN } from './../../../../_core/utils/configApp';
import { Router } from '@angular/router';
import { Person, ManagerInterface } from './../../../../_core/utils/interface';
import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { NzTableFilterFn, NzTableFilterList } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

interface ColumnItem {
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<any> | null;
  filterMultiple: boolean;
}

 

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.css']
})
export class ListManagerComponent implements OnInit {

  listdata: any
  dataSearch: string = '';
  tplModalButtonLoading = false;
  isAdmin = localStorage.getItem(IS_ADMIN)
  listOfFilter = [
    { text: 'Unban', value: 'Unban' },
    { text: 'Ban', value: 'Ban' }
  ]

  constructor(
    private router: Router,
    private userService: UserService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.userService.getManager("1", "10").subscribe((result) => {
      this.listdata = result.items!
      console.log(this.listdata)
    })
  }

  detail(id: string) {
    this.router.navigate(["dashboard/detail-manager/" + id]);
  }

  clickBan(id: number) {
    this.userService.isBan(id).subscribe(() => {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
      });
    }, err => {
      console.log(err);

    })
  }

  clickUnBan(id: number) {
    this.userService.isUnBan(id).subscribe((rs: string) => {
      console.log('rs:', rs);
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
      });
    }, err => {
      console.log(err)

    })
  }

  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.modal.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        value: 'Template Context'
      },
      nzOnOk: () => console.log('Click ok')
    });
  }

  destroyTplModal(modelRef: NzModalRef): void {
    this.tplModalButtonLoading = true;
    setTimeout(() => {
      this.tplModalButtonLoading = false;
      modelRef.destroy();
    }, 1000);
  }
}
