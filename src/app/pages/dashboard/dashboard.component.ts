import { environment } from './../../../environments/environment.prod';
import { Router } from '@angular/router';
import { SaleInfo, TopSelling } from './../../_core/utils/interface';
import { DashboardService } from './../../_core/services/dashboard/dashboard.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // recent-sales
  day: boolean = false;
  month: boolean = false;
  year: boolean = true;
  size: number = 20;
  recentSales: any[] = [];

  // Top selling
  Tsize: number = 20;
  topSellingDay: TopSelling[] = [];
  topSellingMonth: TopSelling[] = [];
  topSellingYear: TopSelling[] = [];
  topSelling: TopSelling[] = [];

  getTypeText: string = "Hôm nay"

  // sale info
  saleInfo: SaleInfo[] = [];
  quantityOrder: number = 0;
  percentQuantityOrder: number = 0;
  cost: number = 0;
  percentCost: number = 0;
  turnover: number = 0;
  percentTurnover: number = 0;
  profit: number = 0;
  percentProfit: number = 0;

  chartData: any[] = []

  chartDay: any[] = []

  constructor(
    private elementRef: ElementRef,
    private dashboard: DashboardService,
    private router: Router
  ) {}

  option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Chi phí', 'Doanh thu', 'Lợi nhuận'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
    },
    yAxis: {
      type: 'value',
    },
    // series: this.chartData,
    series: [
      {
        name: 'Chi phí',
        type: 'line',
        // stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: 'Doanh thu',
        type: 'line',
        // stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: 'Lợi nhuận',
        type: 'line',
        // stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410],
      },
    ],
  };


  ngOnInit(): void {

    this.chartData = [
        {
          name: 'Chi phí',
          type: 'line',
          // stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'Doanh thu',
          type: 'line',
          // stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: 'Lợi nhuận',
          type: 'line',
          // stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410],
        },
      ],

    console.log(this.chartData)

    this.dashboard
      .getRecentSales(this.day, this.month, this.year, this.size)
      .subscribe((result) => {
        this.recentSales = result.data;
        console.log(result.data);
      });
    this.dashboard
      .getTopSellingDay(this.Tsize)
      .subscribe((result) => {
        this.topSellingDay = result.data;
        console.log(result.data);
      });
      this.dashboard
      .getTopSellingMonth(this.Tsize)
      .subscribe((result) => {
        this.topSellingMonth = result.data;
        console.log(result.data);
      });
      this.dashboard
      .getTopSellingYear(this.Tsize)
      .subscribe((result) => {
        this.topSellingYear = result.data;
        console.log(result.data);
      });

    this.dashboard.getSaleInfo().subscribe((result) => {
      this.saleInfo = result.data;
      console.log(result.data);
      this.quantityOrder = result.data.quantityOrder;
      this.percentQuantityOrder = result.data.percentQuantityOrder
      this.cost = result.data.cost;
      this.percentCost = result.data.percentCost;
      this.turnover = result.data.turnover;
      this.percentTurnover = result.data.percentTurnover;
      this.profit = result.data.profit;
      this.percentProfit = result.data.percentProfit;
    });

    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../assets/js/main.js';
    this.elementRef.nativeElement.appendChild(s);
  }

  detailRecentSale(id: number) {
    this.router.navigate(['dashboard/detail-invoice/' + id])
  }

  detailProduct(id: number){
    this.router.navigate(['dashboard/detail-medicine/' + id])
  }

  // filter top selling
  changeListTopSelling(getType: string){
    if(getType == "day"){
      this.getTypeText = "Hôm nay"
      this.topSelling = this.topSellingDay
    }else if(getType == "month"){
      this.getTypeText = "Tháng này"
      this.topSelling = this.topSellingMonth
    }else if(getType == "year"){
      this.getTypeText = "Năm nay"
      this.topSelling = this.topSellingYear
    }
  }

}
