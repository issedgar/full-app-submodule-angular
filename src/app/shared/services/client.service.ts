import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { ajax, AjaxResponse } from 'rxjs/ajax';
import { catchError, map, take, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Client, ClientCreate, ClientUpdate } from '../interfaces/client.interface';
import { Page } from '../interfaces/shared.interface';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    public authService = inject( AuthService );

    public api = `${ environment.baseApi }client`;

    constructor() { }

    get(clientId: number) {
        return ajax<Client>({
            url: `${ this.api }/${ clientId }`,
            method: 'GET',
            responseType: 'json',
            headers: this.getHeader(),
        }).pipe(
            take(1),
            map( (data: AjaxResponse<Client>) => {
                return data.response;
            }),
            catchError(err => throwError(() => console.log(err)))
        );
    }

    getAll() {
        return ajax<Client[]>({
            url: `${ this.api }/all`,
            method: 'GET',
            responseType: 'json',
            headers: this.getHeader()
        }).pipe(
            take(1),
            map( (data: AjaxResponse<Client[]>) => {
                return data.response;
            }),
            catchError(err => throwError(() => console.log(err)))
        );
    }

    getByPage(page: number = 0, size: number = 10) {
        return ajax<Page<Client>>({
            url: `${ this.api }/paginated?page=${ page }&size=${ size }`,
            method: 'GET',
            responseType: 'json',
            headers: this.getHeader()
        }).pipe(
            take(1),
            map( (data: AjaxResponse<Page<Client>>) => {
                return data.response;
            }),
            catchError(err => throwError(() => console.log(err)))
        );
    }

    save(id: number | undefined, client: ClientCreate | ClientUpdate) {
        if(!id) {
            return this.create(client as ClientCreate);
        } else {
            return this.update(id, client as ClientUpdate);
        }
    }

    create(clientCreate: ClientCreate) {
        return ajax<Client>({
            url: `${ this.api }`,
            method: 'POST',
            responseType: 'json',
            headers: this.getHeader(),
            body: clientCreate
        }).pipe(
            take(1),
            map( (data: AjaxResponse<Client>) => {
                return data.response;
            })
        );
    }

    update(clientId: number, clientUpdate: ClientUpdate) {
        return ajax<Client>({
            url: `${ this.api }/${ clientId }`,
            method: 'PUT',
            responseType: 'json',
            headers: this.getHeader(),
            body: clientUpdate
        }).pipe(
            take(1),
            map( (data: AjaxResponse<Client>) => {
                return data.response;
            })
        );
    }

    delete(clientId: number) {
        return ajax<void>({
            url: `${ this.api }/${ clientId }`,
            method: 'DELETE',
            headers: this.getHeader()
        }).pipe(
            take(1)
        );
    }

    getHeader() {
        return { 
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${ this.authService.getData?.token }`
        }
    }
}

