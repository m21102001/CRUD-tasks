import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { LoaderComponent } from './loader/loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    LayoutComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
  ]
})
export class DashboardModule { }
