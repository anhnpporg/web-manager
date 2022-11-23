import { ProductService } from 'src/app/_core/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-list-product-of-active-substance',
  templateUrl: './list-product-of-active-substance.component.html',
  styleUrls: ['./list-product-of-active-substance.component.css']
})
export class ListProductOfActiveSubstanceComponent implements OnInit {

  id: string = ''
  name: string = ''
  width: number = 1
  height: number = 50
  productHaveActiveSubstance: any[] = []
  subParam!: Subscription;
  constructor(
    private atvRoute: ActivatedRoute,
    private router : Router,
    private product: ProductService
  ) {
  }

  detail(id: number) {
    this.router.navigate(['dashboard/detail-medicine/' + id]);
  }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params) => {
      this.id = params['id'];
    console.log(params['id'])
    this.product.getActiveSubstanceById(params['id']).subscribe((result)=>{
      console.log(result)
      this.productHaveActiveSubstance = result.data
    })
    this.product.getNameActiveSubstanceById(params['id']).subscribe((result)=>{
      this.name = result.data.name
    })
  },err => {
    console.log(err)
    this.router.navigate(['/404'])
  });
}

}
