import { Routes } from '@angular/router';
import { GuardPage } from './guard/guard.page';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth/auth.page').then((m) => m.AuthPage),
  },
  {
    path: 'tabs',
    canActivate: [GuardPage], 
    loadChildren: () => import('./tabs/tabs.routes').then( m => m.routes)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'guard',
    loadComponent: () => import('./guard/guard.page').then( m => m.GuardPage)
  },
  {
    path: 'user',
    loadComponent: () => import('./user/user.page').then( m => m.UserPage)
  },
];
