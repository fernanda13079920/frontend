import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const obtenerTokenRol = localStorage.getItem("rol")
  if (obtenerTokenRol ==='ROLE_Administrador') {
    return true;
  } else {
  router.navigateByUrl("login");
    return false;
  }
};
