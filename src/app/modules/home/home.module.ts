
import { UsersProfileComponent } from './../../pages/users-profile/users-profile.component';
import { DetailMedicineComponent } from './medicine/medicine/detail-medicine/detail-medicine.component';
import { CreateMedicineComponent } from './medicine/medicine/create-medicine/create-medicine.component';
import { DetailStaffComponent } from './staff/detail-staff/detail-staff.component';
import { CreateManagerComponent } from './manager/create-manager/create-manager.component';
import { CreateStaffComponent } from './staff/create-staff/create-staff.component';
import { ListStaffComponent } from './staff/list-staff/list-staff.component';
import { ListManagerComponent } from './manager/list-manager/list-manager.component';
import { AntdModule } from 'src/app/_core/share/antd/antd.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { HeaderComponent } from 'src/app/layouts/header/header.component';
import { FooterComponent } from 'src/app/layouts/footer/footer.component';
import { SidebarComponent } from 'src/app/layouts/sidebar/sidebar.component';
import { HomeTemplateComponent } from 'src/app/templates/home-template/home-template.component';
import { DetailManagerComponent } from './manager/detail-manager/detail-manager.component';
import { ListCustomerComponent } from './customer/list-customer/list-customer.component';
import { DetailCustomerComponent } from './customer/detail-customer/detail-customer.component';
import { ListMedicineComponent } from './medicine/medicine/list-medicine/list-medicine.component';
import { MedicineCategoryComponent } from './medicine/category/medicine-category/medicine-category.component';
import { MedicineIngredientComponent } from './medicine/ingredient/medicine-ingredient/medicine-ingredient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeSearchFilterPipe } from 'src/app/_core/pipe/pipe-search-filter.pipe';

const homeRoutes: Routes = [
  {
    path: '', component: HomeTemplateComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'staff', component: ListStaffComponent },
      { path: 'create-staff', component: CreateStaffComponent },
      { path: 'detail-staff/:id', component: DetailStaffComponent },
      { path: 'manager', component: ListManagerComponent },
      { path: 'create-manager', component: CreateManagerComponent },
      { path: 'detail-manager/:id', component: DetailManagerComponent },
      { path: 'customer', component: ListCustomerComponent },
      { path: 'detail-customer/:id', component: DetailCustomerComponent },
      { path: 'medicine', component: ListMedicineComponent },
      { path: 'medicine-category', component: MedicineCategoryComponent },
      { path: 'medicine-ingredient', component: MedicineIngredientComponent },
      { path: 'create-medicine', component: CreateMedicineComponent },
      { path: 'detail-medicine/:id', component: DetailMedicineComponent },
      { path: 'user-profile', component: UsersProfileComponent }
    ]
  }
]


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeTemplateComponent,
    ListManagerComponent,
    ListStaffComponent,
    CreateStaffComponent,
    CreateManagerComponent,
    DetailStaffComponent,
    DetailManagerComponent,
    ListCustomerComponent,
    DetailCustomerComponent,
    ListMedicineComponent,
    MedicineCategoryComponent,
    MedicineIngredientComponent,
    DetailMedicineComponent,
    UsersProfileComponent,
    PipeSearchFilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AntdModule,


  ],
  providers: [
    
  ]
})
export class HomeModule { }
