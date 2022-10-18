import { UserService } from './../../../../_core/services/user/user.service';
import { Router } from '@angular/router';
import { Customer } from 'src/app/_core/utils/interface';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  searchDataCustomer: string = ''
  loading: boolean = true;
  listOfData: Customer[] = []
  searchData: string = ''
  listsearch: any
  selectedProvince = 'searchID'

  constructor(
    private user: UserService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.user.getCustomers().subscribe((result) => {
      console.log(result)
      this.listOfData = result
      this.listsearch = this.listOfData
      this.loading = false
      console.log(this.listOfData)
    })
  }
  detail(id: number) {
    this.router.navigate(["dashboard/detail-customer/" + id]);
  }

  SearchOptionForCustomer(value: string) {
    this.selectedProvince = value
    console.log(this.selectedProvince);
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

  getListSearch() {
    console.log(this.searchData);
    if (this.selectedProvince == "searchID") {
      this.listsearch = this.listOfData.filter(data => data.userId.toString().includes(this.searchData.toLocaleLowerCase()))
    } else if (this.selectedProvince == "SearchPhone") {
      this.listsearch = this.listOfData.filter(data => data.phoneNumber.toString().toLocaleLowerCase().includes(this.searchData.toLocaleLowerCase()))
    } else if (this.selectedProvince == "SearchName") {
      this.listsearch = this.listOfData.filter(data => data.fullname.toLocaleLowerCase().includes(this.searchData.toLocaleLowerCase()))
    }
  }
}
