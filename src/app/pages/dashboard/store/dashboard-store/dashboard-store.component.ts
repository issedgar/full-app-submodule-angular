import { Component, inject } from '@angular/core';
import { StoreService } from '../../../../shared/services/store.service';
import { Store } from '../../../../shared/interfaces/store.interface';

@Component({
  selector: 'app-dashboard-store',
  templateUrl: './dashboard-store.component.html',
  styleUrls: ['./dashboard-store.component.scss']
})
export class DashboardStoreComponent {
  public storeService = inject( StoreService );

    public stores: Store[] = [];
    public totalPages: number = 0;
    public pageSelected: number = 0;

    constructor() {
        this.storeService.getByPage(this.pageSelected, 10).subscribe({
            next: resp => {
                this.stores = resp.content;
                this.totalPages = resp.totalPages;
                console.log(resp)
            },
            error: () => {}
        })
    }

    elementPage() {
        const element: number[] = [];
        for (let index = 0; index < this.totalPages; index++) {
            element.push(index);
        }
        return element;
    }

}
