import { GoodsreceiptnoteService } from './../../../../../_core/services/goodsreceiptnote/goodsreceiptnote.service';
import { GoodReceiptNote } from './../../../../../_core/utils/interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-receipt-note',
  templateUrl: './list-receipt-note.component.html',
  styleUrls: ['./list-receipt-note.component.css']
})
export class ListReceiptNoteComponent implements OnInit {

  goodReceiptNote : GoodReceiptNote[]=[]
  constructor(
    private GRNService: GoodsreceiptnoteService
  ) { }

  ngOnInit(): void {
    this.GRNService.getGoodsReceiptNotes().subscribe((result)=>{

    })
  }


}
