import { ProductService } from 'src/app/_core/services/product/product.service';
import { GoodsreceiptnoteService } from './../../../../../_core/services/goodsreceiptnote/goodsreceiptnote.service';
import {
  BatchInfo,
  GoodIssueNote,
  GoodReceiptNote,
} from './../../../../../_core/utils/interface';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-receipt-note',
  templateUrl: './list-receipt-note.component.html',
  styleUrls: ['./list-receipt-note.component.css'],
})
export class ListReceiptNoteComponent implements OnInit {
  goodReceiptNote: GoodReceiptNote[] = [];
  goodIssueNote: GoodIssueNote[] = [];
  batchInfo: BatchInfo[] = [];
  batchId: string = '';
  batchBarcode: string = '';
  productName: string = '';
  currentQuantity: string = '';
  currentQuantityUnit: string = '';
  manufacturingDate: string = '';
  expiryDate: string = '';
  isActive: boolean = true;
  createdAt: string = '';
  createdBy: string = '';
  updatedAt: string = '';
  updatedBy: string = '';
  subParam!: Subscription;

  constructor(
    private atvRoute: ActivatedRoute,
    private GRNService: GoodsreceiptnoteService,
    private batch: ProductService
  ) {}

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params) => {
      // phiếu nhập
      this.GRNService.getGoodsReceiptNote(params['id']).subscribe((result) => {
        console.log(result.data);
        this.goodReceiptNote = result.data;
      });
      //phiếu xuất
      this.GRNService.getInvoiceByIdBatch(params['id']).subscribe((result) => {
        this.goodIssueNote = result.data;
      });
      // thông tin lô hàng
      this.batch.getProductByIdBatch(params['id']).subscribe((batchInfo) => {
        console.log(batchInfo.data);
        this.batchId = batchInfo.data.id;
        this.batchBarcode = batchInfo.data.batchBarcode;
        this.productName = batchInfo.data.product.name;
        this.manufacturingDate = batchInfo.data.manufacturingDate;
        this.expiryDate = batchInfo.data.expiryDate;
        this.createdAt = batchInfo.data.createdAt;
        this.createdBy = batchInfo.data.createdBy.name;
        this.currentQuantity =
          batchInfo.data.currentQuantity[0].currentQuantity;
        this.currentQuantityUnit = batchInfo.data.currentQuantity[0].unit;
      });
    });
  }
}
