import { ProductService } from 'src/app/_core/services/product/product.service';
import { routeOfAdministration, ActiveSubstance } from './../../../../../_core/utils/interface';
import { BrandsService } from 'src/app/_core/services/brands/brands.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Brand, Shelf, Unit } from 'src/app/_core/utils/interface';

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
  listActiveSubstance: ActiveSubstance[] = []
  listBrand: Brand[]=[]
  listShelf: Shelf[]=[]
  listUnit: Unit[]=[]
  listROA: routeOfAdministration[]=[]

  productData = this.fb.group({
    drugRegistrationNumber: ['',[Validators.required]],
    name: ['',Validators.required],
    brandId: [''],
    shelfId: [''],
    minimumQuantity: ['',Validators.required],
    stockStrength: ['',Validators.required],
    stockStrengthUnitId: ['',Validators.required],
    routeOfAdministrationId: ['',Validators.required],
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
    private brand: BrandsService,
    private product: ProductService

    ) { }

  ngOnInit(): void {
    this.brand.getAllBrand().subscribe((listBrand)=>{
      console.log(listBrand)
      this.listBrand = listBrand
    })
    this.product.getAllShelf().subscribe((listShelf)=>{
      console.log(listShelf)
      this.listShelf = listShelf
    })
    this.product.getStockStrengthUnit().subscribe((listUnit)=>{
      console.log(listUnit)
      this.listUnit = listUnit
    })
    this.product.getROA().subscribe((listROA)=>{
      console.log(listROA)
      this.listROA = listROA
    })
    this.product.getAllActiveSubstance().subscribe((listActiveSubstance)=>{
      console.log(listActiveSubstance)
      this.listActiveSubstance = listActiveSubstance
    })
  }


  clickIsMedicine() {
    this.productData.value.isMedicine = !this.productData.value.isMedicine
  }

  clickIsConsignment() {
    this.productData.value.isConsignment = !this.productData.value.isConsignment
  }

  onSubmit() {
    console.log(this.productData);
    console.log(this.productData)
  }

}
