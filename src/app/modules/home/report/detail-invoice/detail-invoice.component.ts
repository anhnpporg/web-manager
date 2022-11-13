import { InvoiceById, InvoiceDetail } from './../../../../_core/utils/interface';
import { GoodsreceiptnoteService } from './../../../../_core/services/goodsreceiptnote/goodsreceiptnote.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-invoice',
  templateUrl: './detail-invoice.component.html',
  styleUrls: ['./detail-invoice.component.css']
})
export class DetailInvoiceComponent implements OnInit {

  id: string =''
  invoiceDetails : InvoiceDetail[] = []
  invoiceInfo: InvoiceById[] = []
  subParam!: Subscription;
  totalPrice: number = 0

  constructor(
    private router: Router,
    private atvRoute: ActivatedRoute,
    private invoice: GoodsreceiptnoteService
  ) { }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params) => {
      this.id = params['id'];
    console.log(params['id'])
    this.invoice.getInvoice(params['id']).subscribe((result)=>{
      this.invoiceInfo = result.data
    })
    this.invoice.getInvoiceDetail(params['id']).subscribe((invoiceDetails)=>{
      this.invoiceDetails = invoiceDetails.data
      console.log(this.invoiceDetails)
      this.invoiceDetails.forEach(element => {
        this.totalPrice += element.totalPrice
      });
      console.log(this.totalPrice)
    },
    )
  },err => {
    console.log(err)
    this.router.navigate(['/404'])
  });
}

}
