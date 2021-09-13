import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//material
import { MaterialModule } from './material.module';
//environments vars
import { environment } from '../environments/environment';
//router
import { AppRoutingModule } from './app-routing.module';
//components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavComponent } from './components/nav/nav.component';
import { ErrorComponent } from './components/error/error.component';
//services
import { DbService } from './services/db/db.service';
import { AuthService } from './services/auth/auth.service';
import { ListenMenuService } from './services/menu/listen-menu.service';
import { HomeModule } from './components/home/home.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutMeComponent,
    HomeComponent,
    SignupComponent,
    NavComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    HomeModule
  ],
  exports: [],
  providers: [DbService, AuthService, ListenMenuService],
  bootstrap: [AppComponent],
})
export class AppModule {}
