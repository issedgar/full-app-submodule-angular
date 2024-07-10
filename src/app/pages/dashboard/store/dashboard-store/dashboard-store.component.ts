import { Component, inject } from '@angular/core';
import { StoreService } from '../../../../shared/services/store.service';
import { Store } from '../../../../shared/interfaces/store.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboard-store',
  templateUrl: './dashboard-store.component.html',
  styleUrls: ['./dashboard-store.component.scss']
})
export class DashboardStoreComponent {

    public serviceName = 'store';
    public storeService = inject( StoreService );
    public router = inject(Router);

    public stores: Store[] = [];
    public totalPages: number = 0;
    public pageSelected: number = 0;

    constructor() {
        this.loadData();
    }

    loadData() {
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

    add() {
        this.router.navigate([`${this.serviceName}/new`]);
    }

    edit(store: Store) {
        this.router.navigate([`${this.serviceName}/edit`, store.id]);
    }

    delete(store: Store) {
        Swal.fire({
            title: "Eliminar registro?",
            text: "Confirma eliminar el registro!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await lastValueFrom(this.storeService.delete(store.id));

                this.pageSelected = 0;
                this.loadData();

                Swal.fire({
                    title: "Borrado!",
                    text: "El registro ha sido borrado.",
                    icon: "success"
                });
            }
        });
    }

}
