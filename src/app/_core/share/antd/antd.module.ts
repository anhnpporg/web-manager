import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';



@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzInputModule,
    NzIconModule,
    NzFormModule,
    NzSelectModule,
    NzLayoutModule,
    NzTabsModule,
    NzDatePickerModule,
    NzModalModule
  ]
})
export class AntdModule { }
