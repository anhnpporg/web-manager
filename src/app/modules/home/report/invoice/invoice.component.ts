import { GoodsreceiptnoteService } from './../../../../_core/services/goodsreceiptnote/goodsreceiptnote.service';
import { InvoiceById } from './../../../../_core/utils/interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

   invoices : InvoiceById[] = []
  constructor(
    private invoice: GoodsreceiptnoteService
  ) { }

  ngOnInit(): void {
    this.invoice.getInvoices().subscribe((result)=>{
      this.invoices = result.data
      console.log(this.invoices)
    })
  }

}
