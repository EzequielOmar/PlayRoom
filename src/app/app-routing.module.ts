import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { LoginComponent } from './components/login/login.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ErrorComponent } from './components/error/error.component';
import { LobbyComponent } from './components/home/lobby/lobby.component';
import { AhorcadoComponent } from './components/home/ahorcado/ahorcado.component';
import { MayoromenorComponent } from './components/home/mayoromenor/mayoromenor.component';
import { PassRecoveryComponent } from './components/pass-recovery/pass-recovery.component';
import { PreguntadosComponent } from './components/home/preguntados/preguntados.component';
import { SopadeletrasComponent } from './components/home/sopadeletras/sopadeletras.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    //canActivate: [AngularFireAuthGuard],
    //data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: '',
        component: LobbyComponent,
        outlet: 'menuList',
      },
      {
        path: 'ahorcado',
        component: AhorcadoComponent,
        outlet: 'menuList',
      },
      {
        path: 'mayoromenor',
        component: MayoromenorComponent,
        outlet: 'menuList',
      },
      {
        path: 'preguntados',
        component: PreguntadosComponent,
        outlet: 'menuList',
      },
      {
        path: 'sopadeletras',
        component: SopadeletrasComponent,
        outlet: 'menuList',
      },
    ],
  },
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
  {
    path: 'about',
    component: AboutMeComponent,
    //canActivate: [AngularFireAuthGuard],
    //data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: '',
    redirectTo: 'home',
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
