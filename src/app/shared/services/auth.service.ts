import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { ajax, AjaxResponse } from 'rxjs/ajax';
import { catchError, map, take, throwError } from 'rxjs';
import { AuthLogin } from '../interfaces/auth.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public api = `${ environment.baseApi }auth`;

    constructor() { }

    set setData(data: AuthLogin) {
        localStorage.setItem('data', JSON.stringify(data));
    }

    get getData(): AuthLogin | undefined {
        return localStorage.getItem('data') !== null ? JSON.parse(localStorage.getItem('data') as string) as AuthLogin : undefined;
    }

    login(username: string, password: string) {        
        return ajax<AuthLogin>({
            url: `${ this.api }/login`,
            method: 'POST',
            responseType: 'json',
            headers: { "Content-Type" : "application/json" },
            body: {
                username,
                password
            }
        }).pipe(
            take(1),
            map( (data: AjaxResponse<AuthLogin>) => {
                this.setData = data.response;
                return data.response;
            }),
            catchError(err => throwError(() => console.log(err)))
        );
    } 


}
