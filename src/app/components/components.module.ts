import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncrementorComponent } from './incrementor/incrementor.component';
import { DonaComponent } from './dona/dona.component';

import { ChartsModule } from 'ng2-charts';





@NgModule({
  declarations: [
    IncrementorComponent, 
    DonaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports:[
    IncrementorComponent,
    DonaComponent
  ]
})
export class ComponentsModule { }
