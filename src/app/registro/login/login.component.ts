import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { events } from 'src/app/interfaces/log.interface';
import { I_UserDb, I_UserSession } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserDbService } from 'src/app/services/user/user-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: I_UserDb = { email: '', username: '', createdAt: '' };
  pass: string;
  submitted = false;
  spinner = false;
  error = '';
  constructor(
    private auth: AuthService,
    private router: Router,
    private dbUsers: UserDbService
  ) {
    this.pass = '';
  }

  ngOnInit(): void {}

  logIn(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.spinner = true;
      this.auth
        .signIn(form.form.value.email, form.form.value.password)
        .then((res) => {
          this.dbUsers.saveLogin(res.user?.uid ?? '', events.logIn);
          this.saveSessionAndRedirect(res);
        })
        .catch((error) => (this.error = error))
        .finally(() => {
          this.spinner = false;
        });
    }
  }

  signUpGoogle() {
    this.auth
      .signUpWithGoogle()
      .then((res) => {
        if (
          !this.saveNewUser(
            res,
            events.logInGoogle,
            res.user?.displayName ?? ''
          )
        ) {
          this.dbUsers.saveLogin(res.user?.uid ?? '', events.logInTwitter);
        }
        this.saveSessionAndRedirect(res);
      })
      .catch((error) => (this.error = error))
      .finally(() => {
        this.spinner = false;
      });
  }

  signUpWithTwitter() {
    this.auth
      .signUpWithTwitter()
      .then((res) => {
        if (
          !this.saveNewUser(
            res,
            events.signUpTwitter,
            res.user?.displayName ?? ''
          )
        ) {
          this.dbUsers.saveLogin(res.user?.uid ?? '', events.logInTwitter);
        }
        this.saveSessionAndRedirect(res);
      })
      .catch((error) => (this.error = error))
      .finally(() => {
        this.spinner = false;
      });
  }

  fillForm() {
    this.login.email = 'public@saladejuegos.com';
    this.pass = 'public';
  }

  goToSignup() {
    this.router.navigate(['signup']);
  }

  goToRecovery() {
    this.router.navigate(['recovery']);
  }

  private saveNewUser(res: any, event: string, username?: string): Boolean {
    if (!this.dbUsers.exists(res.user?.uid ?? '')) {
      this.dbUsers.saveNewUser(
        res.user?.uid ?? '',
        res.user?.email ?? '',
        event,
        res.user?.displayName ?? username ?? ''
      );
      return true;
    }
    return false;
  }

  private saveSessionAndRedirect(res: any, username?: string) {
    let user: I_UserSession = {
      uid: res.user?.uid ?? '',
      username: res.user?.displayName ?? username ?? '',
      email: res.user?.email ?? '',
    };
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/']);
  }
}
