import { SupplierService } from './../../../../_core/services/supplier/supplier.service';
import { Component, OnInit } from '@angular/core';
import { BatchInfo } from 'src/app/_core/utils/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-supplier',
  templateUrl: './detail-supplier.component.html',
  styleUrls: ['./detail-supplier.component.css']
})
export class DetailSupplierComponent implements OnInit {

  supplierName: string = ''
  supplierDetail : BatchInfo[] = []
  subParam!: Subscription;
  constructor(
    private supplier: SupplierService,
    private router: Router,
    private atvRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params)=>{
      this.supplier.getListBatchOfSupplier(params['id']).subscribe((result)=>{
        this.supplierDetail = result.data
      })
      this.supplier.getSupplierById(params['id']).subscribe((result)=>{
        this.supplierName = result.data.name
      })
    })
  }

  detailGoodsReceiptNote(id: number){
    this.router.navigate(['dashboard/goodsreceiptnote/' + id]);
  }
}
