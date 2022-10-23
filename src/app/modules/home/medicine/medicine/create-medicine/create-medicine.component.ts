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
  listActiveSubstance: ActiveSubstance[] = []
  listBrand: Brand[]=[]
  listShelf: Shelf[]=[]
  listUnit: Unit[]=[]
  listROA: routeOfAdministration[]=[]

  productData = this.fb.group({
    drugRegistrationNumber: ['',[Validators.required]],
    name: ['',Validators.required],
    brandId: ['',Validators.required],
    shelfId: ['',Validators.required],
    minimumQuantity: ['',Validators.required],
    stockStrength: ['',Validators.required],
    stockStrengthUnitId: ['',Validators.required],
    routeOfAdministrationId: ['',Validators.required],
    isMedicine: [false],
    isConsignment: [false],
    activeSubstances: [[],Validators.required]

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
    this.brand.getAllBrand().subscribe((listBrand: Brand[])=>{
      console.log(listBrand)
      this.listBrand = listBrand
    })
    this.product.getAllShelf().subscribe((listShelf: Shelf[])=>{
      console.log(listShelf)
      this.listShelf = listShelf
    })
    this.product.getStockStrengthUnit().subscribe((listUnit: Unit[])=>{
      console.log(listUnit)
      this.listUnit = listUnit
    })
    this.product.getROA().subscribe((listROA: routeOfAdministration[])=>{
      console.log(listROA)
      this.listROA = listROA
    })
    this.product.getAllActiveSubstance().subscribe((listActiveSubstance: ActiveSubstance[])=>{
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
  }

}
