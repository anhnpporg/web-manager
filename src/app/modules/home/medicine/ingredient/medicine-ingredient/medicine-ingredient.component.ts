// import { Customer } from 'src/app/_core/utils/interface';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medicine-ingredient',
  templateUrl: './medicine-ingredient.component.html',
  styleUrls: ['./medicine-ingredient.component.css']
})
export class MedicineIngredientComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  // listOfData: Person[] = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park'
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park'
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park'
  //   }
  // ];

  detail(id: string) {
    this.router.navigate(['dashboard/detail-staff/' + id]);
  }


}
