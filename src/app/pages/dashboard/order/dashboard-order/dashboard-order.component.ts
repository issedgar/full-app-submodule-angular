import { AfterViewInit, Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { lastValueFrom, Observable, Subscription } from 'rxjs';
import { NgModel } from '@angular/forms';

import { Store } from '../../../../shared/interfaces/store.interface';
import { Article } from '../../../../shared/interfaces/article.interface';
import { Order } from '../../../../shared/interfaces/order.interface';

import { ArticleService } from '../../../../shared/services/article.service';
import { StoreService } from '../../../../shared/services/store.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { OrderService } from '../../../../shared/services/order.service';

@Component({
    selector: 'app-dashboard-order',
    templateUrl: './dashboard-order.component.html',
    styleUrls: ['./dashboard-order.component.scss']
})
export class DashboardOrderComponent implements AfterViewInit, OnDestroy {
    @ViewChild('selectNgModel') public selectNgModel!: NgModel;

    public articleService = inject(ArticleService);
    public storeService = inject(StoreService);
    public authService = inject(AuthService);
    public orderService = inject(OrderService);

    public storeId: number = 0;

    public stores$!: Observable<Store[]>;

    private subsCart$!: Subscription;
    private subsStore$!: Subscription;

    public articlesInCart: Article[] = []
    public orders: Order[] = [];
    public articles: Article[] = [];
    public storedIdSelected = 0;

    constructor() {
        this.subsCart$ = this.authService.cartObs$.subscribe({
            next: carts => {
                this.articlesInCart = carts;
            }
        })
        this.initData();
    }
    ngAfterViewInit(): void {
        this.subsStore$ = this.selectNgModel.valueChanges!.subscribe({
            next: async store => {
                if(this.storeId !== store) {
                    this.articlesInCart = [];
                    this.authService.changeCart = this.articlesInCart;
                    this.storeId = store;
                    this.authService.setStored = store;
                } else {
                    this.articlesInCart = this.authService.getCart;
                }
                if(store > 0) {
                    this.orders = await lastValueFrom(this.orderService.getAllByStore(this.storeId));
                    this.articles = await lastValueFrom(this.articleService.getByStore(this.storeId));

                    if(this.articlesInCart.length > 0) {
                        for await (const art of this.articlesInCart) {
                            if(art.addItems && art.addItems > 0) {
                                const articleDB = this.articles.find(a => a.id === art.id);
                                if(articleDB) {
                                    articleDB.stock = articleDB.stock - art.addItems;
                                }
                            }
                        }
                    }
                }
            }
        })
    }

    ngOnDestroy(): void {
        if(this.subsCart$) {
            this.subsCart$.unsubscribe();
        }
        if(this.subsStore$) {
            this.subsStore$.unsubscribe();
        }
    }

    initData() {
        this.stores$ = this.storeService.getAll();

        const storedLocal =  this.authService.getStored;
        if(storedLocal) {
            this.storeId = storedLocal;
        }
    }

    getArticles() {
        return this.articles.filter(f => f.stock > 0);
    }

    add(article: Article) {

        const articlesIn = this.articlesInCart.find(f => f.id === article.id);
        if(articlesIn) {
            articlesIn.addItems = articlesIn.addItems! + 1;

        } else {
            article.addItems = 1;
            this.articlesInCart.push(article);
        }
        this.authService.changeCart = this.articlesInCart;

        const articleAdd = this.articles.find(f => f.id === article.id);
        if(articleAdd) {
            articleAdd.stock = articleAdd.stock - 1;
        }
    }

}
