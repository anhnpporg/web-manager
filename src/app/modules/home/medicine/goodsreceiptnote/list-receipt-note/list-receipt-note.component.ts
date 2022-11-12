import { GoodsreceiptnoteService } from './../../../../../_core/services/goodsreceiptnote/goodsreceiptnote.service';
import { GoodReceiptNote } from './../../../../../_core/utils/interface';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-receipt-note',
  templateUrl: './list-receipt-note.component.html',
  styleUrls: ['./list-receipt-note.component.css']
})
export class ListReceiptNoteComponent implements OnInit {

  goodReceiptNote : GoodReceiptNote[]=[]
  subParam!: Subscription;

  constructor(
    private atvRoute: ActivatedRoute,
    private GRNService: GoodsreceiptnoteService
  ) { }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params)=>{
      // phiếu nhập
      this.GRNService.getGoodsReceiptNote(params['id']).subscribe((result)=>{
        console.log(result.data)
        this.goodReceiptNote = result.data
      })
      //phiếu xuất
      // this.GRNService.getInvoices(params['id']).subscribe((result)=>{

      // })
    })


  }


}
