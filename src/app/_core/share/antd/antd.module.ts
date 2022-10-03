import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';




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
    NzSelectModule
  ]
})
export class AntdModule { }
