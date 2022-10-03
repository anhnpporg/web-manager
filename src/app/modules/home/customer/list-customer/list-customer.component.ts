import { Router } from '@angular/router';
import { Person } from 'src/app/_core/utils/interface';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  searchData: string = ''
  selectedProvince = 'SearchName'
  listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
  listUpdate: Person[] = this.listOfData

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  SearchOption(value: string) {
    this.selectedProvince = value
    console.log(this.selectedProvince);
  }

  SearchList() {
    console.log(this.searchData)
    if (this.selectedProvince == "searchID") {
      this.listUpdate = this.listOfData.filter(data => data.key == this.searchData)
    } else if (this.selectedProvince == "SearchPhone") {
      this.listUpdate = this.listOfData.filter(data => data.name == this.searchData)
    } else if (this.selectedProvince == "SearchName"){
      this.listUpdate = this.listOfData.filter(data => data.address == this.searchData)
    }else{
      this.listUpdate = this.listOfData
    }

    console.log(this.listUpdate);
    
  }

  detail(id: string) {
    this.router.navigate(["dashboard/detail-manager/" + id]);
  }

}
