import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { I_UserDb } from 'src/app/interfaces/user.interface';
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
          if (res.user?.uid) {
            this.dbUsers.saveLoginEmailPass(res.user?.uid ?? '');
            this.router.navigate(['/']);
          }
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
        if (!this.dbUsers.exists(res.user?.uid ?? '')) {
          this.dbUsers.saveNewUserEmailPass(
            res.user?.uid ?? '',
            res.user?.email ?? '',
            res.user?.displayName ?? ''
          );
        }
        this.dbUsers.saveLoginGoogle(res.user?.uid ?? '');
        this.router.navigate(['/']);
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
        if (!this.dbUsers.exists(res.user?.uid ?? '')) {
          this.dbUsers.saveNewUserTwitter(
            res.user?.uid ?? '',
            res.user?.email ?? '',
            res.user?.displayName ?? ''
          );
        }
        this.dbUsers.saveLoginTwitter(res.user?.uid ?? '');
        this.router.navigate(['/']);
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
}
