import { ProductService } from 'src/app/_core/services/product/product.service';
import {
  routeOfAdministration,
  ActiveSubstance,
} from './../../../../../_core/utils/interface';
import { BrandsService } from 'src/app/_core/services/brands/brands.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Brand, Shelf, Unit } from 'src/app/_core/utils/interface';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-create-medicine',
  templateUrl: './create-medicine.component.html',
  styleUrls: ['./create-medicine.component.css'],
})
export class CreateMedicineComponent implements OnInit {
  switchValue: boolean = true;

  listActiveSubstance: ActiveSubstance[] = [];
  listBrand: Brand[] = [];
  listShelf: Shelf[] = [];
  listUnit: Unit[] = [];
  listROA: routeOfAdministration[] = [];

  contact = {
    firstName: 'Harry',
    lastName: 'Potter',
    productUnits: [{ unit: 12, conversionValue: 10 , price: 12}]
  }
  form: FormGroup = this.formBuilder.group({
    firstName: this.contact.firstName,
    lastName: this.contact.lastName,
    productUnits: this.buildContacts(this.contact.productUnits)
  });
  get productUnits(): FormArray {
    return this.form.get('productUnits') as FormArray;
  }

  buildContacts(productUnits: {unit: number; conversionValue: number; price: number}[] = []) {
    return this.formBuilder.array(productUnits.map(productUnit => this.formBuilder.group(productUnit)));
  }

  addContactField() {
    this.productUnits.push(this.formBuilder.group({phoneNo: null, conversionValue: null, price: null}))
  }

  removeContactField(index: number): void {
    if (this.productUnits.length >= 1) this.productUnits.removeAt(index);
    else this.productUnits.patchValue([{unit: null, conversionValue: null, price: null}]);
  }

  header: string = 'Đơn vị tính'

  productData = this.fb.group({
    drugRegistrationNumber: ['', [Validators.required]], //mã số đăng kí
    name: ['', Validators.required], // tên thuốc
    brandId: ['', Validators.required], // mã nhà sản xuất
    shelfId: ['', Validators.required], // mã kệ thuốc
    mininumInventory: ['', Validators.required], //mức tồn kho tối thiểu
    routeOfAdministrationId: ['', Validators.required], // đường dùng
    isUseDose: [false], // bán theo liều
    isManagedInBatches: [false], // quản lý theo lô, hạn sử dụng
    activeSubstances: [[], Validators.required], // hoạt chất
    unit: ['', Validators.required], // đơn vị cơ sở
    price: ['', Validators.required], // giá bán
    isPackingSpecification: [false], // hiển thị quy cách đóng gói
    isDoseBasedOnBodyWeightUnit: [false], // đơn vị liều dùng
    productUnits: [{
      unit: [],
      conversionValue: [], // giá trị quy đổi
      price: [],
      isPackingSpecification: [false],
      isDoseBasedOnBodyWeightUnit: [false],
    }],
  });

  get statusError() {
    return this.productData.controls;
  }

  constructor(
    private fb: FormBuilder,
    private brand: BrandsService,
    private product: ProductService,
    private router: Router,
    private notification: NzNotificationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.brand.getAllBrand().subscribe((listBrand) => {
      console.log(listBrand);
      this.listBrand = listBrand.data
    });
    this.product.getAllShelf().subscribe((listShelf) => {
      console.log(listShelf);
      this.listShelf = listShelf.data
    });
    this.product.getROA().subscribe((listROA) => {
      console.log(listROA);
      this.listROA = listROA.data;
    });
    this.product
      .getAllActiveSubstance()
      .subscribe((listActiveSubstance) => {
        console.log(listActiveSubstance);
        this.listActiveSubstance = listActiveSubstance.data
      });
  }

  clickIsUseDose() {
    this.productData.value.isUseDose = !this.productData.value.isUseDose;
  }

  clickIsManagedInBatches() {
    this.productData.value.isManagedInBatches = !this.productData.value.isManagedInBatches;
  }

  clickIsPackingSpecification(){
    this.productData.value.isPackingSpecification = !this.productData.value.isPackingSpecification;
  }

  clickIsDoseBasedOnBodyWeightUnit(){
    this.productData.value.isDoseBasedOnBodyWeightUnit = !this.productData.value.isDoseBasedOnBodyWeightUnit;
  }

  onSubmit() {
    console.log(this.productData);
    // var product: any = new FormData();
    // product.append(
    //   'drugRegistrationNumber',
    //   this.productData.value.drugRegistrationNumber
    // );
    // product.append('name', this.productData.value.name);
    // product.append('brandId', this.productData.value.brandId);
    // product.append('shelfId', this.productData.value.shelfId);
    // product.append('mininumInventory', this.productData.value.mininumInventory);
    // product.append(
    //   'routeOfAdministrationId',
    //   this.productData.value.routeOfAdministrationId
    // );
    // product.append('activeSubstances', this.productData.value.activeSubstances);
    // product.append('isUseDose' , this.productData.value.isUseDose)
    // product.append('isManagedInBatches', this.productData.value.isManagedInBatches)
    // product.append('unit', this.productData.value.unit);
    // product.append('price', this.productData.value.price);
      console.log(this.productUnits)
    this.product.createProduct(this.productData).subscribe(
      (rs: any) => {
        console.log(rs);
        // this.isSubmit = true
        this.notification.create('success', 'Tạo thuốc mới thành công', '');
        this.router.navigate(['dashboard/medicine']);
      },
      (err: { error: { message: any } }) => {
        console.log(err);

        this.notification.create(
          'error',
          'Không thành công',
          err.error.message
        );
      }
    );
  }
}
