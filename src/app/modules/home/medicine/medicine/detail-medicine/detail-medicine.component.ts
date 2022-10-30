import { ProductService } from 'src/app/_core/services/product/product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-medicine',
  templateUrl: './detail-medicine.component.html',
  styleUrls: ['./detail-medicine.component.css']
})
export class DetailMedicineComponent implements OnInit {

  id: string = ''
  medicineDetail: any[] = []
  // drugRegistrationNumber: string =''
  // barcode: string =''
  // name:string =''
  // brand: {
  //   id: string;
  //   name: string;
  // } | undefined
  // shelf: {
  //   id: string;
  //   name: string;
  // } | undefined
  // minimumQuantity: string =''
  // stockStrength: string =''
  // stockStrengthUnit: {
  //     id: string
  //     name: string
  //   }|undefined
  // routeOfAdministration: {
  //     id: string
  //     name: string
  //   }|undefined
  // isMedicine: boolean = true
  // isConsignment: boolean = true
  // isActive: boolean = true
  // createdAt: string =''
  // createdBy: {
  //     id: string
  //     name: string
  //   }|undefined
  //   updatedAt: string | null | undefined
  //   updatedBy: string | null | undefined
  //   activeSubstances: [
  //     {
  //       id: string
  //       name: string
  //     }
  //   ] | undefined
  //   productUnits: [
  //     {
  //       id: string
  //       productId: string
  //       unit: {
  //         id: string
  //         name: string
  //       },
  //       conversionValue: string
  //       price: string
  //       isBaseUnit: boolean
  //     }
  //   ]|undefined;

  subParam!: Subscription;

  constructor(
    private atvRoute: ActivatedRoute,
    private product: ProductService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params) => {
      this.id = params['id'];
    // Error: response status is 500, wait BE fix
    this.product.getProductById(this.id).subscribe((productDetails)=>{
      console.log(productDetails)
      // this.drugRegistrationNumber = productDetails.drugRegistrationNumber;
      // this.barcode = productDetails.barcode;
      // this.name = productDetails.name;
      // this.brand = productDetails.brand.name;
    })
    }, err => {
      this.route.navigate(['/404'])
    });
  }

}
