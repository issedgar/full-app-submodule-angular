import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import Swal from 'sweetalert2'

import { Client } from '../../../../shared/interfaces/client.interface';
import { ClientService } from '../../../../shared/services/client.service';

@Component({
    selector: 'app-dashboard-client',
    templateUrl: './dashboard-client.component.html',
    styleUrls: ['./dashboard-client.component.scss']
})
export class DashboardClientComponent {

    public serviceName = 'client';
    public clientService = inject(ClientService);
    public router = inject(Router);

    public clients: Client[] = [];
    public totalPages: number = 0;
    public pageSelected: number = 0;

    constructor() {
        this.loadData();
    }

    loadData() {
        this.clientService.getByPage(this.pageSelected, 10).subscribe({
            next: resp => {
                this.clients = resp.content;
                this.totalPages = resp.totalPages;
            },
            error: () => { }
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

    edit(client: Client) {
        this.router.navigate([`${this.serviceName}/edit`, client.id]);
    }

    delete(client: Client) {
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
                await lastValueFrom(this.clientService.delete(client.id));

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
