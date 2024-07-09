import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { DashboardClientComponent } from './client/dashboard-client/dashboard-client.component';
import { DashboardStoreComponent } from './store/dashboard-store/dashboard-store.component';
import { DashboardArticleComponent } from './article/dashboard-article/dashboard-article.component';
import { DashboardOrderComponent } from './order/dashboard-order/dashboard-order.component';

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
                path: 'store',
                component: DashboardStoreComponent,
                canActivate: [ AuthGuard ]
            },
            {
                path: 'article',
                component: DashboardArticleComponent,
                canActivate: [ AuthGuard ]
            },
            {
                path: 'order',
                component: DashboardOrderComponent,
                canActivate: [ AuthGuard ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
