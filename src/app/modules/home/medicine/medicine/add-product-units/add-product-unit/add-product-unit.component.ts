import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product-unit',
  templateUrl: './add-product-unit.component.html',
  styleUrls: ['./add-product-unit.component.css']
})
export class AddProductUnitComponent implements OnInit {

  @Input() productId: number = 0
  constructor() { }

  ngOnInit(): void {
  }

}
