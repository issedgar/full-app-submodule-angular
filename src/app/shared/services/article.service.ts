import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { ajax, AjaxResponse } from 'rxjs/ajax';
import { catchError, map, take, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Article, ArticleCreate, ArticleUpdate } from '../interfaces/article.interface';
import { Page } from '../interfaces/shared.interface';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    public authService = inject(AuthService);

    public api = `${environment.baseApi}article`;

    constructor() { }

    get(articleId: number) {
        return ajax<Article>({
            url: `${this.api}/${articleId}`,
            method: 'GET',
            responseType: 'json',
            headers: this.getHeader(),
        }).pipe(
            take(1),
            map((data: AjaxResponse<Article>) => {
                return data.response;
            }),
            catchError(err => throwError(() => console.log(err)))
        );
    }

    getByPage(page: number = 0, size: number = 10) {
        return ajax<Page<Article>>({
            url: `${this.api}/paginated?page=${page}&size=${size}`,
            method: 'GET',
            responseType: 'json',
            headers: this.getHeader()
        }).pipe(
            take(1),
            map((data: AjaxResponse<Page<Article>>) => {
                return data.response;
            }),
            catchError(err => throwError(() => console.log(err)))
        );
    }

    getByStore(storeId: number) {
        return ajax<Article[]>({
            url: `${this.api}/by-store/${ storeId }`,
            method: 'GET',
            responseType: 'json',
            headers: this.getHeader()
        }).pipe(
            take(1),
            map((data: AjaxResponse<Article[]>) => {
                return data.response;
            }),
            catchError(err => throwError(() => console.log(err)))
        );
    }

    save(id: number | undefined, article: ArticleCreate | ArticleUpdate) {
        if(!id) {
            return this.create(article as ArticleCreate);
        } else {
            return this.update(id, article as ArticleUpdate);
        }
    }

    create(articleCreate: ArticleCreate) {
        return ajax<Article>({
            url: `${this.api}`,
            method: 'POST',
            responseType: 'json',
            headers: this.getHeader(),
            body: articleCreate
        }).pipe(
            take(1),
            map((data: AjaxResponse<Article>) => {
                return data.response;
            })
        );
    }

    update(articleId: number, articleUpdate: ArticleUpdate) {
        return ajax<Article>({
            url: `${this.api}/${articleId}`,
            method: 'PUT',
            responseType: 'json',
            headers: this.getHeader(),
            body: articleUpdate
        }).pipe(
            take(1),
            map((data: AjaxResponse<Article>) => {
                return data.response;
            })
        );
    }

    delete(articleId: number) {
        return ajax<void>({
            url: `${ this.api }/${ articleId }`,
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
