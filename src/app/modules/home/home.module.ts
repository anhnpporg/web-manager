import { NgxBarcodeModule } from '@greatcloak/ngx-barcode'
import { UsersProfileComponent } from './../../pages/users-profile/users-profile.component';
import { DetailMedicineComponent } from './medicine/medicine/detail-medicine/detail-medicine.component';
import { CreateMedicineComponent } from './medicine/medicine/create-medicine/create-medicine.component';
import { DetailStaffComponent } from './staff/detail-staff/detail-staff.component';
import { CreateStaffComponent } from './staff/create-staff/create-staff.component';
import { ListStaffComponent } from './staff/list-staff/list-staff.component';
import { AntdModule } from 'src/app/_core/share/antd/antd.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { HeaderComponent } from 'src/app/layouts/header/header.component';
import { FooterComponent } from 'src/app/layouts/footer/footer.component';
import { SidebarComponent } from 'src/app/layouts/sidebar/sidebar.component';
import { HomeTemplateComponent } from 'src/app/templates/home-template/home-template.component';
import { ListCustomerComponent } from './customer/list-customer/list-customer.component';
import { DetailCustomerComponent } from './customer/detail-customer/detail-customer.component';
import { ListMedicineComponent } from './medicine/medicine/list-medicine/list-medicine.component';
import { MedicineCategoryComponent } from './medicine/category/medicine-category/medicine-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeSearchFilterPipe } from 'src/app/_core/pipe/pipe-search-filter.pipe';
import { NgxEchartsModule } from 'ngx-echarts';
import { isSubmitGuard } from 'src/app/_core/guards/isSubmit.guard';
import { ListBrandComponent } from './brand/list-brand/list-brand.component';
import { ListActiveSubstanceComponent } from './medicine/activeSubstance/list-active-substance/list-active-substance.component';
import { ListProductOfActiveSubstanceComponent } from './medicine/activeSubstance/list-product-of-active-substance/list-product-of-active-substance.component';
import { TagInputModule } from 'ngx-chips';

const homeRoutes: Routes = [
  {
    path: '', component: HomeTemplateComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'staff', component: ListStaffComponent },
      { path: 'create-staff', component: CreateStaffComponent, canDeactivate: [isSubmitGuard] },
      { path: 'detail-staff/:id', component: DetailStaffComponent },
      { path: 'customer', component: ListCustomerComponent },
      { path: 'detail-customer/:id', component: DetailCustomerComponent },
      { path: 'medicine', component: ListMedicineComponent },
      { path: 'medicine-category', component: MedicineCategoryComponent },
      { path: 'create-medicine', component: CreateMedicineComponent },
      { path: 'detail-medicine/:id', component: DetailMedicineComponent },
      { path: 'user-profile', component: UsersProfileComponent },
      { path: 'brands', component: ListBrandComponent },
      { path: 'medicine-activeSubstance', component: ListActiveSubstanceComponent },
      { path: 'medicine-activeSubstance/:id', component: ListProductOfActiveSubstanceComponent}
    ]
  }
]


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeTemplateComponent,
    ListStaffComponent,
    CreateStaffComponent,
    DetailStaffComponent,
    ListCustomerComponent,
    DetailCustomerComponent,
    ListMedicineComponent,
    MedicineCategoryComponent,
    DetailMedicineComponent,
    UsersProfileComponent,
    PipeSearchFilterPipe,
    ListBrandComponent,
    ListActiveSubstanceComponent,
    ListProductOfActiveSubstanceComponent,
    CreateMedicineComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    FormsModule,
    TagInputModule,
    ReactiveFormsModule,
    CommonModule,
    AntdModule,
    NgxBarcodeModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),

  ],
  providers: [
    isSubmitGuard
  ]
})
export class HomeModule { }
