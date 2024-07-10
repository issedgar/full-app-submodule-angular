import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AjaxError } from 'rxjs/ajax';
import { lastValueFrom } from 'rxjs';

import Swal from 'sweetalert2';

import { Store } from '../../../../../shared/interfaces/store.interface';
import { StoreService } from '../../../../../shared/services/store.service';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.scss']
})
export class StoreComponent {

    public storeService = inject(StoreService);

    public title = 'Tienda';

    public id: number | undefined = undefined;

    public loading = false;

    public store!: Store;

    public form: FormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        address: ['', Validators.required]
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
        if(this.id) {
            this.loading = true;
            this.store = await lastValueFrom(this.storeService.get(this.id));
            this.loadDataForm(this.store);
            this.loading = false;
        }
    }

    save() {
        if(this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.loading = true;

        this.storeService.save(this.id, this.form.value).subscribe({
            next: async _ => {
                this.loading = false;
                await Swal.fire({ title: "Guardar", text: "El registro ha sido guardado", icon: "info" });
                this.router.navigate(['store']);
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
                if(this.form.get(key)) {
                    switch (key) {
                        default:
                            this.form.get(key)!.setValue(data[key]);
                            break;
                    }
                }
            }
        }
    }

}
