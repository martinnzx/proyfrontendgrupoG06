import { Routes } from '@angular/router';

export const routes: Routes = [
  // Ruta raiz
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  // Ruta home
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },

  // Ruta login
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then((m) => m.LoginComponent),
  },

    // Ruta register
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then((m) => m.RegisterComponent),
  },

  // Ruta desconocida
  { path: '**', redirectTo: 'home' },

  /* ----------------------------------------------------

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
  
  ---------------------------------------------------- */

];