import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { userDb } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DbService } from 'src/app/services/db/db.service';
import { databases } from 'src/app/services/db/const';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class SignupComponent implements OnInit {
  signup = userDb;
  submitted = false;
  spinner = false;
  pass: string;
  passCheck: string;
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private db: DbService
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
        .signUp(form.form.value.email, form.form.value.password)
        .then((res) => {
          if (res.user) {
            this.saveNewUser(res.user.uid);
            this.router.navigate(['/']);
          }
        })
        .catch((error) => (this.error = error))
        .finally(() => {
          this.spinner = false;
        });
    }
  }

  signUpWithGoogle() {
    this.submitted = true;
    this.auth
      .signUpWithGoogle()
      .then((res) => {
        if (res.user?.email) {
          this.signup.email = res.user.email;
          this.saveNewUser(res.user.uid);
        }
        this.router.navigate(['/']);
      })
      .catch((error) => (this.error = error))
      .finally(() => {
        this.spinner = false;
      });
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  private saveNewUser(uid: string) {
    this.signup.createdAt = new Date().toJSON();
    this.db.setWithId(databases.users, uid, this.signup);
  }
}
