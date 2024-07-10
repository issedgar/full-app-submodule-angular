import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthLogin } from '../interfaces/auth.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService );
  const data: AuthLogin | undefined = authService.getData;

  let isAuth = false;

  if(data !== undefined && data.token !== '') {
    const token = data.token;
    const helper = new JwtHelperService();
    isAuth = !helper.isTokenExpired(token);    
  }

  if(!isAuth) {
    authService.logout();
  }

  return isAuth;
  
};
