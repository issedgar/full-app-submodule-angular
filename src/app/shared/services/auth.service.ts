import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { ajax, AjaxResponse } from 'rxjs/ajax';
import { BehaviorSubject, catchError, map, Subject, Subscription, take, throwError } from 'rxjs';
import { AuthLogin } from '../interfaces/auth.interface';
import { Router } from '@angular/router';
import { Article } from '../interfaces/article.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public api = `${ environment.baseApi }auth`;
    public router = inject(Router);

    
    private cartSubj: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
    public cartObs$ = this.cartSubj.asObservable();

    private KEY_DATA = 'data';
    private KEY_STORED_SELECTED = 'selectedStoredId';

    constructor() { }

    set changeCart(articles: Article[]) {
        this.cartSubj.next(articles);
    }

    get getCart() {
        return this.cartSubj.getValue();
    }

    set setData(data: AuthLogin) {
        localStorage.setItem(this.KEY_DATA, JSON.stringify(data));
    }

    get getData(): AuthLogin | undefined {
        return localStorage.getItem(this.KEY_DATA) !== null ? JSON.parse(localStorage.getItem(this.KEY_DATA) as string) as AuthLogin : undefined;
    }

    set setStored(storedId: number) {
        localStorage.setItem(this.KEY_STORED_SELECTED, String(storedId));
    }

    get getStored(): number | undefined {
        return localStorage.getItem(this.KEY_STORED_SELECTED) !== null ? Number(localStorage.getItem(this.KEY_STORED_SELECTED)) : undefined;
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
    
    logout() {
        localStorage.removeItem(this.KEY_DATA);
        localStorage.removeItem(this.KEY_STORED_SELECTED);
        this.router.navigate(['/login']);
    }


}
