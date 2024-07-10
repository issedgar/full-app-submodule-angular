import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import Swal from 'sweetalert2';

import { Article } from '../../../../shared/interfaces/article.interface';
import { ArticleService } from '../../../../shared/services/article.service';

@Component({
    selector: 'app-dashboard-article',
    templateUrl: './dashboard-article.component.html',
    styleUrls: ['./dashboard-article.component.scss']
})
export class DashboardArticleComponent {

    public serviceName = 'article';
    public articleService = inject( ArticleService );
    public router = inject(Router);

    public articles: Article[] = [];
    public totalPages: number = 0;
    public pageSelected: number = 0;

    constructor() {
        this.loadData();
    }

    loadData() {
        this.articleService.getByPage(this.pageSelected, 10).subscribe({
            next: resp => {
                this.articles = resp.content;
                this.totalPages = resp.totalPages;
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

    add() {
        this.router.navigate([`${this.serviceName}/new`]);
    }

    edit(article: Article) {
        this.router.navigate([`${this.serviceName}/edit`, article.id]);
    }

    delete(article: Article) {
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
                await lastValueFrom(this.articleService.delete(article.id));

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
