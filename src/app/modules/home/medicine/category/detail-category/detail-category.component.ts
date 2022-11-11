import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_core/services/product/product.service';
import { query } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.css']
})
export class DetailCategoryComponent implements OnInit {

  id: string = ''
  name: string = ''

  shelfs: any[]=[]

  subParam!: Subscription;

  constructor(
    private router: Router,
    private atvRoute: ActivatedRoute,
    private product: ProductService,
  ) { }

  detail(id: number) {
    this.router.navigate(['dashboard/detail-medicine/' + id]);
  }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params: { [x: string]: number; }) => {
      // this.id = params['id'];
      this.product.getShelfById(params['id']).subscribe((result)=>{
        console.log(result.data)
        this.shelfs = result.data
        console.log(this.shelfs.length)
      })
  }, (err: any) => {
    this.router.navigate(['/404'])
  });
  }
}
