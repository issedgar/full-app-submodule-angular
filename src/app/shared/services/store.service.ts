import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { ajax, AjaxResponse } from 'rxjs/ajax';
import { catchError, map, take, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Store, StoreCreate, StoreUpdate } from '../interfaces/store.interface';
import { Page } from '../interfaces/shared.interface';

@Injectable({
    providedIn: 'root'
})
export class StoreService {

    public authService = inject(AuthService);

    public api = `${environment.baseApi}store`;

    constructor() { }

    get(storeId: number) {
        return ajax<Store>({
            url: `${this.api}/${storeId}`,
            method: 'GET',
            responseType: 'json',
            headers: this.getHeader(),
        }).pipe(
            take(1),
            map((data: AjaxResponse<Store>) => {
                return data.response;
            }),
            catchError(err => throwError(() => console.log(err)))
        );
    }

    getAll() {
        return ajax<Store[]>({
            url: `${this.api}/all`,
            method: 'GET',
            responseType: 'json',
            headers: this.getHeader(),
        }).pipe(
            take(1),
            map((data: AjaxResponse<Store[]>) => {
                return data.response;
            }),
            catchError(err => throwError(() => console.log(err)))
        );
    }

    getByPage(page: number = 0, size: number = 10) {
        return ajax<Page<Store>>({
            url: `${this.api}/paginated?page=${page}&size=${size}`,
            method: 'GET',
            responseType: 'json',
            headers: this.getHeader()
        }).pipe(
            take(1),
            map((data: AjaxResponse<Page<Store>>) => {
                return data.response;
            }),
            catchError(err => throwError(() => console.log(err)))
        );
    }

    save(id: number | undefined, store: StoreCreate | StoreUpdate) {
        if(!id) {
            return this.create(store as StoreCreate);
        } else {
            return this.update(id, store as StoreUpdate);
        }
    }

    create(storeCreate: StoreCreate) {
        return ajax<Store>({
            url: `${this.api}`,
            method: 'POST',
            responseType: 'json',
            headers: this.getHeader(),
            body: storeCreate
        }).pipe(
            take(1),
            map((data: AjaxResponse<Store>) => {
                return data.response;
            })
        );
    }

    update(storeId: number, storeUpdate: StoreUpdate) {
        return ajax<Store>({
            url: `${this.api}/${storeId}`,
            method: 'PUT',
            responseType: 'json',
            headers: this.getHeader(),
            body: storeUpdate
        }).pipe(
            take(1),
            map((data: AjaxResponse<Store>) => {
                return data.response;
            })
        );
    }

    delete(storeId: number) {
        return ajax<void>({
            url: `${ this.api }/${ storeId }`,
            method: 'DELETE',
            headers: this.getHeader()
        }).pipe(
            take(1)
        );
    }

    getHeader() {
        return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.authService.getData?.token}`
        }
    }
}
