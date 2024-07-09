import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardClientComponent } from './client/dashboard-client/dashboard-client.component';
import { DashboardStoreComponent } from './store/dashboard-store/dashboard-store.component';
import { DashboardArticleComponent } from './article/dashboard-article/dashboard-article.component';
import { DashboardOrderComponent } from './order/dashboard-order/dashboard-order.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardClientComponent,
    DashboardStoreComponent,
    DashboardArticleComponent,
    DashboardOrderComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
