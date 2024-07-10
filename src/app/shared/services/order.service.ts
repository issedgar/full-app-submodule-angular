import { inject, Injectable } from '@angular/core';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { catchError, map, take, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Order, OrderCreate } from '../interfaces/order.interface';

import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    public authService = inject(AuthService);
    public api = `${environment.baseApi}order`;

    constructor() { }

    get(orderId: number) {
        return ajax<Order>({
            url: `${this.api}/${orderId}`,
            method: 'GET',
            responseType: 'json',
            headers: this.getHeader(),
        }).pipe(
            take(1),
            map((data: AjaxResponse<Order>) => {
                return data.response;
            }),
            catchError(err => throwError(() => console.log(err)))
        );
    }

    getAllByStore(storeId: number) {
        return ajax<Order[]>({
            url: `${this.api}/all-by-store/${ storeId }`,
            method: 'GET',
            responseType: 'json',
            headers: this.getHeader(),
        }).pipe(
            take(1),
            map((data: AjaxResponse<Order[]>) => {
                return data.response;
            }),
            catchError(err => throwError(() => console.log(err)))
        );
    }    

    create(orderCreate: OrderCreate) {
        return ajax<Order>({
            url: `${this.api}`,
            method: 'POST',
            responseType: 'json',
            headers: this.getHeader(),
            body: orderCreate
        }).pipe(
            take(1),
            map((data: AjaxResponse<Order>) => {
                return data.response;
            })
        );
    }

    getHeader() {
        return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.authService.getData?.token}`
        }
    }
}
