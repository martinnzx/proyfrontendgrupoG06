import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('./features/usuarios/usuario-list/usuario-list').then(
        (m) => m.UsuarioListComponent
      ),
  },
  { path: '**', redirectTo: 'login' },
];