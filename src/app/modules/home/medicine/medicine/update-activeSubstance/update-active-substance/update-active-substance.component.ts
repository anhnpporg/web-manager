import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductService } from 'src/app/_core/services/product/product.service';

@Component({
  selector: 'app-update-active-substance',
  templateUrl: './update-active-substance.component.html',
  styleUrls: ['./update-active-substance.component.css']
})
export class UpdateActiveSubstanceComponent implements OnInit {

  @Input() productId: number = 0
  activeSubstance: any[] = []
  constructor(
    private notification: NzNotificationService,
    private modal: NzModalService,
    private product: ProductService,
    private router : Router
  ) { }

  ngOnInit(): void {
    // this.product.getActiveSubstanceById(this.productId).subscribe((result)=>{
    //   this.activeSubstance = result.data
    // })
  }

}
