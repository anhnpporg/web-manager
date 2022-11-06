import { routeOfAdministration } from './../../../../../_core/utils/interface';
import { ProductService } from 'src/app/_core/services/product/product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-medicine',
  templateUrl: './detail-medicine.component.html',
  styleUrls: ['./detail-medicine.component.css'],
})
export class DetailMedicineComponent implements OnInit {
  medicineDetail: any[] = [];
  id: string = '';
  drugRegistrationNumber: string = '';
  barcode: string = '';
  name: string = '';
  brand: string = ''
  shelf : string =''
  mininumInventory: string = '';
  routeOfAdministration: string =''
  isUseDose: boolean = true;
  isManagedInBatches: boolean = true;
  isActive: boolean = true;
  createdAt: string = '';
  createdBy: string = ''
  activeSubstances: any[] = [];
  productUnits: any[] = [];
  batches: any[] = []
  subParam!: Subscription;

  constructor(
    private atvRoute: ActivatedRoute,
    private product: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe(
      (params) => {
        this.id = params['id'];
        this.product.getProductById(this.id).subscribe((productDetails) => {
          console.log(productDetails);
          this.medicineDetail = productDetails
          this.drugRegistrationNumber = productDetails.drugRegistrationNumber
          this.name = productDetails.name
          this.barcode = productDetails.barcode
          this.mininumInventory = productDetails.mininumInventory
          this.isUseDose = productDetails.isUseDose
          this.isManagedInBatches = productDetails.isManagedInBatches
          this.isActive = productDetails.isActive
          this.brand = productDetails.brand.name
         this.routeOfAdministration = productDetails.routeOfAdministration.name
         this.createdAt = productDetails.createdAt
         this.createdBy = productDetails.createdBy.name
         this.shelf = productDetails.shelf.name
         this.activeSubstances = productDetails.activeSubstances
         this.productUnits = productDetails.productUnits
         this.batches = productDetails.batches
        });
      },
      (err) => {
        this.router.navigate(['/404']);
      }
    );
  }

  detailActiveSubstence(id: number) {
    this.router.navigate(['dashboard/medicine-activeSubstance/' + id]);
  }
  detailGoodsReceiptNote(id: number){
    this.router.navigate(['dashboard/goodsreceiptnote/' + id]);
  }

}
