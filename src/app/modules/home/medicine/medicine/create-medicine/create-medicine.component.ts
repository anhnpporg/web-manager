import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-medicine',
  templateUrl: './create-medicine.component.html',
  styleUrls: ['./create-medicine.component.css']
})
export class CreateMedicineComponent implements OnInit {

  switchValue: boolean = true
  autocompleteItemsAsObjects = [
    { value: 'Item1', id: 0 },
    { value: 'item3', id: 2 },
    { value: 'item4', id: 3 },
    { value: 'item5', id: 4 },
    { value: 'item6', id: 5 },
    { value: 'item7', id: 6 },
    { value: 'item9', id: 8 },
    { value: 'item8', id: 7 },
    { value: 'item2', id: 1 },
  ];

  productData = this.fb.group({
    drugRegistrationNumber: [''],
    name: [''],
    brandId: [''],
    shelfId: [''],
    minimumQuantity: [''],
    stockStrength: [],
    stockStrengthUnitId: [''],
    routeOfAdministrationId: [''],
    isMedicine: [false],
    isConsignment: [false],
    activeSubstances: [[]]

  }, {
  });

  get statusError() {
    return this.productData.controls;
  }

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  clickIsMedicine() {
    this.productData.value.isMedicine = !this.productData.value.isMedicine
  }

  clickIsConsignment() {
    this.productData.value.isConsignment = !this.productData.value.isConsignment
  }

  onSubmit() {
    console.log(this.productData);

  }

}
