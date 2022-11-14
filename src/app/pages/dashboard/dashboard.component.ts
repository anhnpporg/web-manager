import { DashboardService } from './../../_core/services/dashboard/dashboard.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // recent-sales
  day: boolean = true
  month: boolean = false
  year: boolean = false
  size: number = 5
  recentSales: any[] = []

  // Top selling
  Tday: boolean = true
  Tmonth: boolean = false
  Tyear: boolean = false
  Tsize: number = 5
  topSelling : any[] = []

  constructor(
    private elementRef: ElementRef,
    private dashboard: DashboardService
    ) { }

  option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Chi phí','Doanh thu', 'Lợi nhuận']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Chi phí',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Doanh thu',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Lợi nhuận',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
    ]
  };

  ngOnInit(): void {
    this.dashboard.getRecentSales(this.day, this.month, this.year, this.size).subscribe((result)=>{
      this.recentSales = result.data
      console.log(result.data)
    })

    this.dashboard.getTopSelling(this.Tday, this.Tmonth, this.Tyear, this.Tsize).subscribe((result)=>{
      this.topSelling = result.data
      console.log(result.data)
    })


    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

  }

}
