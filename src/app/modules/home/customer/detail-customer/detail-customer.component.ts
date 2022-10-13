import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/_core/services/user/user.service';
@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit {

  id: string = ''
  phoneNumber: string = ''
  fullname: string = ''
  createdAt: string = ''
  subParam!: Subscription;

  constructor(
    private route:Router,
    private atvRoute: ActivatedRoute,
    private user: UserService
  ) {}

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params) => {
      this.id = params['id'];
    this.user.getProfilebyID(params['id']).subscribe((result)=>{
      console.log(result)
    this.fullname = result?.fullname;
    this.createdAt = result?.createdAt;
    this.phoneNumber = result?.phoneNumber;
    })
    }, err =>{
      this.route.navigate(['/404'])
    });
  }

}
