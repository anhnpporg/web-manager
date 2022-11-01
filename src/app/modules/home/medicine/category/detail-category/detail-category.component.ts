import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/_core/services/product/product.service';
import { query } from '@angular/animations';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.css']
})
export class DetailCategoryComponent implements OnInit {

  id: string = ''
  name: string = ''
  panels = [
    {
      id: 4,
      active: false,
      name: 'active substance 1',
      disabled: false
    },
    {
      id: 5,
      active: false,
      disabled: false,
      name: 'active substance 2'
    },
    {
      id: 6,
      active: false,
      disabled: false,
      name: 'active substance 3'
    }
  ];

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
    this.subParam = this.atvRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.product.getShelfById(params['id']).subscribe((result)=>{
        console.log(result)
        this.shelfs = result
        console.log(this.shelfs.length)
      })
  }, err => {
    this.router.navigate(['/404'])
  });
  }
}
