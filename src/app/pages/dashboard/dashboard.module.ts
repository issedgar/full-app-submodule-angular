import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardClientComponent } from './client/dashboard-client/dashboard-client.component';
import { DashboardStoreComponent } from './store/dashboard-store/dashboard-store.component';
import { DashboardArticleComponent } from './article/dashboard-article/dashboard-article.component';
import { DashboardOrderComponent } from './order/dashboard-order/dashboard-order.component';

import { ClientComponent } from './client/components/client/client.component';
import { StoreComponent } from './store/components/store/store.component';
import { ArticleComponent } from './article/components/article/article.component';
import { OrderComponent } from './order/components/order/order.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardClientComponent,
    DashboardStoreComponent,
    DashboardArticleComponent,
    DashboardOrderComponent,
    ClientComponent,
    StoreComponent,
    ArticleComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
