import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {    

    public authService = inject(AuthService);
    public router = inject(Router);

    public numberAdds: number = 0;

    private subsCart$!: Subscription;
    
    constructor() {
        this.subsCart$ = this.authService.cartObs$.subscribe({
            next: carts => {
                this.numberAdds = carts.length || 0;
            }
        })
    }

    ngOnDestroy(): void {
        if(this.subsCart$) {
            this.subsCart$.unsubscribe();
        }
    }

    logout() {
        this.authService.logout();
    }

    addOrder() {
        this.router.navigate(['order/cart']);
    }


}
