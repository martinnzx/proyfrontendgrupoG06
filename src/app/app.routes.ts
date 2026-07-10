import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { entrenadorGuard } from './guards/entrenador.guard';
import { socioGuard } from './guards/socio.guard';

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

  // Ruta usuarios (protegida - solo admin)
  {
    path: 'usuarios',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./components/usuarios/usuarios-list/usuarios-list.component').then((m) => m.UsuariosListComponent),
  },

  // Ruta dashboard (protegida - solo admin)
  {
    path: 'dashboard',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./components/dashboard/dashboard').then((m) => m.DashboardComponent),
  },

    // Ruta suscripciones (protegida - solo admin)
  {
    path: 'suscripciones',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./components/suscripciones-list/suscripciones-list.component').then((m) => m.SuscripcionesListComponent),
  },

  // Ruta tarifas (protegida - solo admin)
  {
    path: 'tarifas',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./components/tarifas-list/tarifas-list.component').then((m) => m.TarifasListComponent),
  },

  // Ruta pagos (protegida - solo admin)
  {
    path: 'pagos',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./components/pagos-list/pagos-list.component').then((m) => m.PagosListComponent),
  },

  // Ruta ejercicios (protegida - solo entrenador)
  {
    path: 'ejercicios',
    canActivate: [entrenadorGuard],
    loadComponent: () =>
      import('./components/ejercicios-list/ejercicios-list.component').then((m) => m.EjerciciosListComponent),
  },

  // Ruta rutinas (protegida - solo entrenador)
  {
    path: 'rutinas',
    canActivate: [entrenadorGuard],
    loadComponent: () =>
      import('./components/rutinas-list/rutinas-list.component').then((m) => m.RutinasListComponent),
  },

  // Rutas del socio (protegidas)
  {
    path: 'mis-pagos',
    canActivate: [socioGuard],
    loadComponent: () =>
      import('./components/mis-pagos/mis-pagos').then((m) => m.MisPagosComponent),
  },
  {
    path: 'mis-rutinas',
    canActivate: [socioGuard],
    loadComponent: () =>
      import('./components/mis-rutinas/mis-rutinas').then((m) => m.MisRutinasComponent),
  },
  
  // Ruta pago exitoso mercado pago
  {
    path: 'pago-exitoso',
    canActivate: [socioGuard],
    loadComponent: () =>
      import('./components/pago-exitoso-component/pago-exitoso-component.component').then((m) => m.PagoExitosoComponentComponent),
  },
 
  {
    path: 'nutricion',
    canActivate: [socioGuard],
    loadComponent: () =>
      import('./components/nutricion/nutricion.component').then((m) => m.NutricionComponent),
  },

  // Ruta desconocida
  { path: '**', redirectTo: 'home' },

];