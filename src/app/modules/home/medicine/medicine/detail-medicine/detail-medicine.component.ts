import { UserService } from './../../../../../_core/services/user/user.service';
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
  id: number = 0;
  drugRegistrationNumber: string = '';
  barcode: string = '';
  name: string = '';
  brand: string = '';
  brandId: number = 0;
  shelf: string = '';
  shelfId: number = 0;
  mininumInventory: string = '';
  routeOfAdministration: string = '';
  isUseDose: boolean = true;
  isManagedInBatches: boolean = true;
  isActive: boolean = true;
  createdAt: string = '';
  createdBy: string = '';
  activeSubstances: any[] = [];
  productUnits: any[] = [];
  batches: any[] = [];
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
          this.medicineDetail = productDetails.data;
          this.drugRegistrationNumber =
            productDetails.data.drugRegistrationNumber;
          this.name = productDetails.data.name;
          this.barcode = productDetails.data.barcode;
          this.mininumInventory = productDetails.data.mininumInventory;
          this.isUseDose = productDetails.data.isUseDose;
          this.isManagedInBatches = productDetails.data.isManagedInBatches;
          this.isActive = productDetails.data.isActive;
          this.brand = productDetails.data.brand.name;
          this.brandId = productDetails.data.brand.id;
          this.routeOfAdministration =
            productDetails.data.routeOfAdministration.name;
          this.createdAt = productDetails.data.createdAt;
          this.createdBy = productDetails.data.createdBy.name;
          this.shelf = productDetails.data.shelf.name;
          this.shelfId = productDetails.data.shelf.id;
          this.activeSubstances = productDetails.data.activeSubstances;
          this.productUnits = productDetails.data.productUnits;
          console.log(this.productUnits);
          this.batches = productDetails.data.batches;
        });
      },
      (err) => {
        this.router.navigate(['/404']);
      }
    );
  }

  detailBrand(id: number) {
    this.router.navigate(['dashboard/detail-brand/' + id]);
  }

  detailShelf(id: number) {
    this.router.navigate(['dashboard/detail-category/' + id]);
  }

  detailActiveSubstence(id: number) {
    this.router.navigate(['dashboard/medicine-activeSubstance/' + id]);
  }

  detailGoodsReceiptNote(id: number) {
    this.router.navigate(['dashboard/goodsreceiptnote/' + id]);
  }
}
