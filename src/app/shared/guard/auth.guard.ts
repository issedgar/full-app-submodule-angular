import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthLogin } from '../interfaces/auth.interface';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService );
  const data: AuthLogin | undefined = authService.getData;
  return data !== undefined && data.token !== '';
  
};
