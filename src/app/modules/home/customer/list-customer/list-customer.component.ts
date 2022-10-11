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
  selectedProvince = 'SearchID'
  loading: boolean = true;
  listOfData: Customer[] = []

  constructor(
    private user: UserService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.user.getCustomers().subscribe((result)=>{
      console.log(result)
      this.listOfData = result
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

  // SearchList() {
  //   console.log(this.searchData)
  //   if (this.selectedProvince == "searchID") {
  //     this.listUpdate = this.listOfData.filter(data => data.key == this.searchData)
  //   } else if (this.selectedProvince == "SearchPhone") {
  //     this.listUpdate = this.listOfData.filter(data => data.name == this.searchData)
  //   } else if (this.selectedProvince == "SearchName"){
  //     this.listUpdate = this.listOfData.filter(data => data.address == this.searchData)
  //   }else{
  //     this.listUpdate = this.listOfData
  //   }
  //   console.log(this.listUpdate);
  // }
}
