import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/shared/guard/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardClientComponent } from './client/dashboard-client/dashboard-client.component';
import { DashboardStoreComponent } from './store/dashboard-store/dashboard-store.component';
import { DashboardArticleComponent } from './article/dashboard-article/dashboard-article.component';
import { DashboardOrderComponent } from './order/dashboard-order/dashboard-order.component';

import { ClientComponent } from './client/components/client/client.component';
import { StoreComponent } from './store/components/store/store.component';
import { ArticleComponent } from './article/components/article/article.component';
import { OrderComponent } from './order/components/order/order.component';

const routes: Routes = [
    { 
        path: '', 
        component: DashboardComponent,
        children: [
            {
                path: 'client',
                component: DashboardClientComponent,
                canActivate: [ AuthGuard ]
            },
            {
                path: 'client/new',
                component: ClientComponent
            },
            {
                path: 'client/edit/:id',
                component: ClientComponent
            },
            {
                path: 'store',
                component: DashboardStoreComponent,
                canActivate: [ AuthGuard ]
            },
            {
                path: 'store/new',
                component: StoreComponent
            },
            {
                path: 'store/edit/:id',
                component: StoreComponent
            },
            {
                path: 'article',
                component: DashboardArticleComponent,
                canActivate: [ AuthGuard ]
            },
            {
                path: 'article/new',
                component: ArticleComponent
            },
            {
                path: 'article/edit/:id',
                component: ArticleComponent
            },
            {
                path: 'order',
                component: DashboardOrderComponent,
                canActivate: [ AuthGuard ]
            },
            {
                path: 'order/cart',
                component: OrderComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
