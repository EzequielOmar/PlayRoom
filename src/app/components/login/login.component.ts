import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { userDb } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { databases } from 'src/app/services/db/const';
import { DbService } from 'src/app/services/db/db.service';
import { logDb } from 'src/app/interfaces/log';
import { events } from 'src/app/interfaces/log';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login = userDb;
  pass: string;
  submitted = false;
  spinner = false;
  error = '';
  constructor(
    private auth: AuthService,
    private router: Router,
    private db: DbService
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
            this.saveLog(res.user?.uid);
            this.router.navigate(['/']);
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = error;
        })
        .finally(() => {
          this.spinner = false;
        });
    }
  }

  signUpGoogle() {
    this.submitted = true;
    this.auth
      .signUpWithGoogle()
      .then((res) => {
        if (res.user?.uid) {
          this.saveLog(res.user?.uid);
          this.router.navigate(['/']);
        }
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

  private saveLog(uid: string) {
    const log: logDb = { event: events.LogIn, datetime: new Date().toJSON() };
    this.db.setWithId(databases.logs, uid, log);
  }
}
