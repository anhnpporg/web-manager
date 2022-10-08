import { UserService } from './../../../../_core/services/user/user.service';
import { StaffInterface } from './../../../../_core/utils/interface';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrls: ['./list-staff.component.css']
})
export class ListStaffComponent implements OnInit {

  searchData: string = ''
  listData: StaffInterface[] = []
  selectedProvince = 'searchID'
  loading: boolean = true;

  constructor(
    private user: UserService,
    private router: Router,

  ) {

  }

  ngOnInit(): void {
    this.user.getStaffs().subscribe((result) => {
      console.log(result)
      this.listData = result
      this.loading = false
      console.log(this.listData)
    })
  }

  detail(id: number) {
    this.router.navigate(['dashboard/detail-staff/' + id]);
  }

  clickBan(id: number) {
    this.user.isBan(id).subscribe(() => {
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
    this.user.isUnBan(id).subscribe((rs: string) => {
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

  SearchOption(value: string) {
    this.selectedProvince = value
    console.log(this.selectedProvince);
  }



}
