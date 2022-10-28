import { ProductService } from 'src/app/_core/services/product/product.service';
import { routeOfAdministration, ActiveSubstance } from './../../../../../_core/utils/interface';
import { BrandsService } from 'src/app/_core/services/brands/brands.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Brand, Shelf, Unit } from 'src/app/_core/utils/interface';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { List } from 'echarts';

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
    stockStrength: [''],
    stockStrengthUnitId: [''],
    routeOfAdministrationId: [''],
    isMedicine: [false],
    isConsignment: [false],
    activeSubstances: [[''],Validators.required],
    unitId: ['',Validators.required],
    price: ['',Validators.required],
    productUnits: [{
      UnitId: [''],
      ConversionValue: [''],
      Price: ['']}
    ]
  }, {
  });

  get statusError() {
    return this.productData.controls;
  }

  constructor(
    private fb: FormBuilder,
    private brand: BrandsService,
    private product: ProductService,
    private router: Router,
    private notification: NzNotificationService
    ) { }

  ngOnInit(): void {
    this.brand.getAllBrand().subscribe((listBrand: Brand[])=>{
      console.log(listBrand)
      listBrand.forEach(element => {
        if(element.isActive){
        this.listBrand.push(element)
        }
      });

    })
    this.product.getAllShelf().subscribe((listShelf: Shelf[])=>{
      console.log(listShelf)
      listShelf.forEach(element => {
        if(element.isActive){
        this.listShelf.push(element)
        }
      });
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
      listActiveSubstance.forEach(element => {
        if(element.isActive){
        this.listActiveSubstance.push(element)
        }
      });
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
    var product: any = new FormData()
    product.append('drugRegistrationNumber', this.productData.value.drugRegistrationNumber);
    product.append('name', this.productData.value.name);
    product.append('brandId', this.productData.value.brandId);
    product.append('shelfId', this.productData.value.shelfId);
    product.append('minimumQuantity', this.productData.value.minimumQuantity);
    product.append('stockStrength', this.productData.value.stockStrength);
    product.append('stockStrengthUnitId', this.productData.value.stockStrengthUnitId);
    product.append('routeOfAdministrationId', this.productData.value.routeOfAdministrationId);
    product.append('isMedicine', this.productData.value.isMedicine);
    product.append('isConsignment', this.productData.value.isConsignment);

    // check data payload
    product.append('activeSubstances', this.productData.value.activeSubstances);

    product.append('unitId', this.productData.value.unitId);
    product.append('price',this.productData.value.price);
    var productUnits: any = new FormData()
    productUnits.forEach((element: any) => {
      productUnits.append('UnitId', element.value.UnitId)
      productUnits.append('ConversionValue', element.value.ConversionValue)
      productUnits.append('Price', element.value.Price)
      // check data payload
    product.append('productUnits', this.productData.value.productUnits);
    });

    this.product.createProduct(product).subscribe((rs: any)=>{
      console.log(rs);
      // this.isSubmit = true
      this.notification.create(
        'success',
        'Tạo thuốc mới thành công', ''
      )
      this.router.navigate(['dashboard/medicine'])
    }, (err: { error: { message: any; }; }) => {
      console.log(err);

      this.notification.create(
        'error',
        'Không thành công',
        (err.error.message)
      )
    })
  }

}
