import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AjaxError } from 'rxjs/ajax';
import { lastValueFrom } from 'rxjs';

import Swal from 'sweetalert2';

import { ClientService } from '../../../../../shared/services/client.service';

import { Client } from '../../../../../shared/interfaces/client.interface';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss']
})
export class ClientComponent {

    public clientService = inject(ClientService);

    public title = 'Cliente';

    public id: number | undefined = undefined;

    public loading = false;

    public client!: Client;

    public form: FormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        address: ['', Validators.required],
        username: [''],
        password: ['']
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
            this.client = await lastValueFrom(this.clientService.get(this.id));
            this.loadDataForm(this.client);
            this.loading = false;
        } else {
            this.form.get('username')?.setValidators([Validators.required])
            this.form.get('password')?.setValidators([Validators.required])
        }
    }

    save() {
        if(this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.loading = true;

        this.clientService.save(this.id, this.form.value).subscribe({
            next: async _ => {
                this.loading = false;
                await Swal.fire({ title: "Guardar", text: "El registro ha sido guardado", icon: "info" });
                this.router.navigate(['client']);
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
