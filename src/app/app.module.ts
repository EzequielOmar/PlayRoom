import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
