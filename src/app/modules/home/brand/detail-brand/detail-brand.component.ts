import { Medicine } from './../../../../_core/utils/interface';
import { BrandsService } from './../../../../_core/services/brands/brands.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-brand',
  templateUrl: './detail-brand.component.html',
  styleUrls: ['./detail-brand.component.css']
})
export class DetailBrandComponent implements OnInit {

  brandName: string = ''
  brandDetail : Medicine[] = []
  subParam!: Subscription;
  constructor(
    private brand: BrandsService,
    private router: Router,
    private atvRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params)=>{
      this.brand.getDetailByBrandID(params['id']).subscribe((result)=>{
        this.brandDetail = result.data
      })
      this.brand.getBrandName(params['id']).subscribe((name)=>{
        this.brandName = name.data.name
      })
    })
  }

  detail(id: number) {
    this.router.navigate(['dashboard/detail-medicine/' + id]);
  }

}
