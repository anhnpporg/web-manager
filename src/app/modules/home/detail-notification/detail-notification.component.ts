import { Noti } from './../../../_core/utils/interface';
import { DashboardService } from 'src/app/_core/services/dashboard/dashboard.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-notification',
  templateUrl: './detail-notification.component.html',
  styleUrls: ['./detail-notification.component.css']
})
export class DetailNotificationComponent implements OnInit {

  date: string = ''
  list: Noti[] = []
  listNotiBatch: any[] = []
  listNotiQuantity: any[] = []
  subParam!: Subscription;

  constructor(
    private router: Router,
    private atvRoute: ActivatedRoute,
    private noti: DashboardService
  ) { }

  ngOnInit(): void {
    this.subParam = this.atvRoute.params.subscribe((params) => {
      this.noti.getNotification(params['date']).subscribe((result)=>{
        // console.log(result.data);
        this.date = result.data.notiDate
        this.list = result.data
        console.log(this.list);

        // if(result.data.listNotiBatch.listNotification!=null){
          // this.listNotiBatch = result.data.listNotiBatch.listNotification
        // }
        // if(result.data.listNotiQuantity.listNotification!=null){
          // this.listNotiQuantity = result.data.listNotiQuantity.listNotification
        // }
      })
    })
  }

}
