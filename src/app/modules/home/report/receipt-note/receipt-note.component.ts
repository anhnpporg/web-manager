import { GoodsreceiptnoteService } from './../../../../_core/services/goodsreceiptnote/goodsreceiptnote.service';
import { Component, OnInit } from '@angular/core';
import { GoodReceiptNote } from 'src/app/_core/utils/interface';

@Component({
  selector: 'app-receipt-note',
  templateUrl: './receipt-note.component.html',
  styleUrls: ['./receipt-note.component.css']
})
export class ReceiptNoteComponent implements OnInit {

  receiptnote: GoodReceiptNote[] = []

  constructor(
    private receiptnotes: GoodsreceiptnoteService
  ) { }

  ngOnInit(): void {
    this.receiptnotes.getGoodsReceiptNotes().subscribe((result)=>{
      this.receiptnote = result
      console.log(this.receiptnote)
    })
  }

}
