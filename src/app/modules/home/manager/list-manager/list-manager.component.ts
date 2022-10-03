import { UserService } from './../../../../_core/services/user/user.service';
import { IS_ADMIN } from './../../../../_core/utils/configApp';
import { Router } from '@angular/router';
import { Person, ManagerInterface } from './../../../../_core/utils/interface';
import { Component, ElementRef, OnInit } from '@angular/core';
import { NzTableFilterFn, NzTableFilterList } from 'ng-zorro-antd/table';

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
  isAdmin = localStorage.getItem(IS_ADMIN)
  listOfFilter = [
    { text: 'Unban', value: 'Unban' },
    { text: 'Ban', value: 'Ban' }
  ]

  constructor(
    private router: Router,
    private userService: UserService
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

}
