import { ProductService } from 'src/app/_core/services/product/product.service';
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
    private receiptnotes: GoodsreceiptnoteService,
    private product: ProductService
  ) { }

  ngOnInit(): void {
    this.receiptnotes.getGoodsReceiptNotes().subscribe((result)=>{
      this.receiptnote = result.data
      console.log(this.receiptnote)
    })
  }

  // getNameProductByIdBatch(id: number){
  //   this.product.getProductByIdBatch(id).subscribe((product)=>{
  //     return product.data.product.name
  //   })
  // }
}
