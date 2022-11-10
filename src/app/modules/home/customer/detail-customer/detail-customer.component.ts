import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/_core/services/user/user.service';
import { InvoiceById } from 'src/app/_core/utils/interface';
@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css'],
})
export class DetailCustomerComponent implements OnInit {

  invoice : InvoiceById[]= []
  id: string = '';
  phoneNumber: string = '';
  fullname: string = '';
  createdAt: string = '';
  totalPoint: string = '';
  createdBy: string = '';
  updatedAt: string = '';
  updatedBy: string = '';
  subParam!: Subscription;

  constructor(
    private route: Router,
    private atvRoute: ActivatedRoute,
    private user: UserService
  ) {}

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe(
      (params) => {
        this.id = params['id'];
        this.user.getCustomer(params['id']).subscribe((result) => {
          console.log(result);
          this.fullname = result?.fullName;
          this.createdAt = result?.createdAt;
          this.phoneNumber = result?.phoneNumber;
          this.totalPoint = result?.totalPoint;
          this.createdBy = result?.createdBy;
          this.updatedAt = result.updatedAt;
          this.updatedBy = result.updatedBy;
        });
        this.user.getInvoicesByIdUser(params['id']).subscribe((invoices) => {
          console.log(invoices.data)
        this.invoice = invoices.data
        }
        );
      },
      (err) => {
        this.route.navigate(['/404']);
      }
    );
  }
}
