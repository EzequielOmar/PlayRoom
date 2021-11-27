import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//environments vars
import { environment } from '../environments/environment';
//router
import { AppRoutingModule } from './app-routing.module';
//components
import { AppComponent } from './app.component';
import { LoginComponent } from './registro/login/login.component';
import { ErrorComponent } from './error/error.component';
import { SignupComponent } from './registro/signup/signup.component';
import { PassRecoveryComponent } from './registro/pass-recovery/pass-recovery.component';
//services
import { DbService } from './services/db/db.service';
import { AuthService } from './services/auth/auth.service';
import { ListenMenuService } from './services/menu/listen-menu.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    SignupComponent,
    PassRecoveryComponent,
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
  ],
  exports: [],
  providers: [DbService, AuthService, ListenMenuService],
  bootstrap: [AppComponent],
})
export class AppModule {}
