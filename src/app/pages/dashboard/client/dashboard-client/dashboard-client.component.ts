import { Component, inject } from '@angular/core';
import { ClientService } from '../../../../shared/services/client.service';
import { Client } from '../../../../shared/interfaces/client.interface';

@Component({
    selector: 'app-dashboard-client',
    templateUrl: './dashboard-client.component.html',
    styleUrls: ['./dashboard-client.component.scss']
})
export class DashboardClientComponent {

    public clientService = inject( ClientService );

    public clients: Client[] = [];
    public totalPages: number = 0;
    public pageSelected: number = 0;

    constructor() {
        this.clientService.getByPage(this.pageSelected, 10).subscribe({
            next: resp => {
                this.clients = resp.content;
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
