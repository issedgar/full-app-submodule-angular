import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AjaxError } from 'rxjs/ajax';
import { lastValueFrom, Observable } from 'rxjs';

import Swal from 'sweetalert2';

import { ArticleService } from '../../../../../shared/services/article.service';
import { StoreService } from '../../../../../shared/services/store.service';

import { Article } from '../../../../../shared/interfaces/article.interface';
import { Store } from '../../../../../shared/interfaces/store.interface';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
    public articleService = inject(ArticleService);
    public storeService = inject(StoreService);

    public title = 'Articulo';

    public id: number | undefined = undefined;

    public loading = false;

    public article!: Article;

    public stores$!: Observable<Store[]>;

    public form: FormGroup = this.formBuilder.group({
        code: ['', Validators.required],
        description: ['', Validators.required],
        image: ['', [Validators.required, Validators.pattern('^(ftp|http|https):\\/\\/[^ "]+$')]],
        
        price: [0, Validators.required],
        stock: [0, Validators.required],
        storeId: ['', Validators.required]
    });

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly formBuilder: FormBuilder
    ) {
        this.id = +this.activatedRoute.snapshot.paramMap.get('id')!;

        this.initData();
    }

    async initData() {        
        this.stores$ = this.storeService.getAll();
        if(this.id) {
            this.loading = true;
            this.article = await lastValueFrom(this.articleService.get(this.id));
            this.loadDataForm(this.article);
            this.loading = false;
        }
    }

    save() {
        if(this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.loading = true;

        this.articleService.save(this.id, this.form.value).subscribe({
            next: async _ => {
                this.loading = false;
                await Swal.fire({ title: "Guardar", text: "El registro ha sido guardado", icon: "info" });
                this.router.navigate(['article']);
            },
            error: async (error: AjaxError) => {
                this.loading = false;
                if(error.response.message) {
                    await Swal.fire({ title: "Error", text: `El registro no se pudo guardar: ${ error.response.message }`, icon: "error" });

                }
            }
        })
    }

    inputIsValid(field: string) {
        return this.form.controls[field]?.errors &&
             this.form.controls[field].touched;
    }

    loadDataForm(data: any): void {
        if(data) {        
            for(const key of Object.keys(data)) {
                switch (key) {
                    case 'store':
                        const store = data[key] as Store;
                        this.form.get('storeId')!.setValue(store.id);
                    break;
                    default:
                        if(this.form.get(key)) {
                            this.form.get(key)!.setValue(data[key]);
                        }
                        break;
                }
                
            }
        }
    }

    existImage() {
        return this.form.get('image')?.value !== '';
    }

}
