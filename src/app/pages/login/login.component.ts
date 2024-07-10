import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    public loginForm: FormGroup = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
    });

    public loading = false;
    public loginError = false;

    constructor(
        private readonly fb: FormBuilder,
        private readonly router: Router,
        private readonly authService: AuthService
    ) {}

    loginUser() {

        const { username, password } = this.loginForm.value;

        this.authService.login(username, password).subscribe({
            next: (resp) => {
                console.log('🐭', resp);
                this.router.navigate(['/']);
            },
            error: () => { this.loginError = true }
        })
    }
}
