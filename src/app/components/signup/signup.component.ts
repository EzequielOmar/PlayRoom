import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { I_UserDb, I_UserSession } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserDbService } from 'src/app/services/user/user-db.service';
import { events, I_logDb } from 'src/app/interfaces/log.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class SignupComponent implements OnInit {
  signup: I_UserDb = { email: '', username: '', createdAt: '' };
  submitted = false;
  spinner = false;
  pass: string;
  passCheck: string;
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private dbUsers: UserDbService
  ) {
    this.pass = '';
    this.passCheck = '';
  }

  ngOnInit(): void {}

  signUp(form: NgForm) {
    this.submitted = true;
    if (form.valid && this.passCheck === this.pass) {
      this.spinner = true;
      this.auth
        .signUp(
          form.form.value.email,
          form.form.value.password,
          form.form.value.username
        )
        .then((res) => {
          this.saveNewUser(res, events.signUp, form.form.value.username);
          this.saveSessionAndRedirect(res, form.form.value.username);
        })
        .catch((error) => (this.error = error))
        .finally(() => {
          this.spinner = false;
        });
    }
  }

  signUpWithGoogle() {
    this.auth
      .signUpWithGoogle()
      .then((res) => {
        if (
          !this.saveNewUser(
            res,
            events.signUpGoogle,
            res.user?.displayName ?? ''
          )
        ) {
          this.dbUsers.saveLogin(res.user?.uid ?? '', events.logInGoogle);
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
            events.logInTwitter,
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

  goToLogin() {
    this.router.navigate(['login']);
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
