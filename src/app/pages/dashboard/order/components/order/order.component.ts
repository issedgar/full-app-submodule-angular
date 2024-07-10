import { AfterViewInit, Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

import { count, Observable, Subscription } from 'rxjs';

import { AuthService } from '../../../../../shared/services/auth.service';
import { ClientService } from '../../../../../shared/services/client.service';
import { OrderService } from '../../../../../shared/services/order.service';

import { Article } from '../../../../../shared/interfaces/article.interface';
import { Client } from '../../../../../shared/interfaces/client.interface';
import { OrderCreate, OrderDetailCreate } from '../../../../../shared/interfaces/order.interface';
import Swal from 'sweetalert2';
import { AjaxError } from 'rxjs/ajax';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements AfterViewInit, OnDestroy {
    @ViewChild('selectNgModel') public selectNgModel!: NgModel;

    public authService = inject(AuthService);
    public clientService = inject(ClientService);
    public orderService = inject(OrderService);

    public router = inject(Router);

    private subsCart$!: Subscription;
    private subsClient$!: Subscription;

    public clients$!: Observable<Client[]>;

    public articles: Article[] = [];

    public clientId: number = 0;
    public orderNum: string = '';

    constructor() {        
        this.initData();
    }

    ngOnDestroy(): void {
        if(this.subsCart$) {
            this.subsCart$.unsubscribe();
        }
        if(this.subsClient$) {
            this.subsClient$.unsubscribe();
        }
    }

    ngAfterViewInit(): void {
        this.subsClient$ = this.selectNgModel.valueChanges!.subscribe({
            next: async client => {                
                if(client > 0) {
                    this.clientId = client;

                    this.subsCart$ = this.authService.cartObs$.subscribe({
                        next: carts => {
                            this.articles = carts;
                        }
                    })
                    this.articles = this.authService.getCart;
                }
            }
        })
    }

    initData() {
        this.clients$ = this.clientService.getAll();
    }

    async generateOrder() {

        if(this.orderNum === '') {
            await Swal.fire({ title: "Número de orden", text: `El número de orden es requerido`, icon: "warning" });
            return;
        }

        const orderDetailCreate: OrderDetailCreate[] = this.articles.map( article => {
            return {
                count: article.addItems!,
                total: article.addItems! * article.price,
                articleId: article.id
            };
        });

        const orderCreate: OrderCreate = {
            clientId: +this.clientId,
            orderNum: this.orderNum,
            storeId: +this.articles[0].storeId,
            orderDetailList: orderDetailCreate
        }


        this.orderService.create(orderCreate).subscribe({
            next: async _ => {
                await Swal.fire({ title: "Guardar", text: "El registro ha sido guardado", icon: "info" });
                this.router.navigate(['order']);
            },
            error: async (error: AjaxError) => {
                if(error.response.message) {
                    await Swal.fire({ title: "Error", text: `El registro no se pudo guardar: ${ error.response.message }`, icon: "error" });

                }
            }
        })

    }

}
