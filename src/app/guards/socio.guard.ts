import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const socioGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isLoggedIn() && (loginService.getRol() === 'socio' || !loginService.getRol())) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};