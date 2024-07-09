import { Component, inject } from '@angular/core';
import { ArticleService } from '../../../../shared/services/article.service';
import { Article } from '../../../../shared/interfaces/article.interface';

@Component({
    selector: 'app-dashboard-article',
    templateUrl: './dashboard-article.component.html',
    styleUrls: ['./dashboard-article.component.scss']
})
export class DashboardArticleComponent {

    public articleService = inject( ArticleService );

    public articles: Article[] = [];
    public totalPages: number = 0;
    public pageSelected: number = 0;

    constructor() {
        this.articleService.getByPage(this.pageSelected, 10).subscribe({
            next: resp => {
                this.articles = resp.content;
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
