import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';

//modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

//import { AppRoutingModule } from '../app-routing.module';

import { RouterModule} from '@angular/router'
import { FormsModule} from '@angular/forms';
import { AccountSettingsComponent } from './account-settings/account-settings.component'



@NgModule({
  declarations: [DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ComponentsModule,
    
  ],
  exports:[
    
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    AccountSettingsComponent,
  ]
})
export class PagesModule { }
