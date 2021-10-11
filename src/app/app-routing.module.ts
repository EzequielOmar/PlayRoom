import { NgModule, Pipe } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';
//components
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './registro/login/login.component';
import { SignupComponent } from './registro/signup/signup.component';
import { PassRecoveryComponent } from './registro/pass-recovery/pass-recovery.component';

const redirectLoggedToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedToHome },
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'recovery',
        component: PassRecoveryComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
