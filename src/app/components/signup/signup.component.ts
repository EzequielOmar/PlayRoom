import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { I_UserDb } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserDbService } from 'src/app/services/user/user-db.service';

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
          this.dbUsers.saveNewUserEmailPass(
            res.user?.uid ?? '',
            res.user?.email ?? '',
            form.form.value.username ?? ''
          );
          this.router.navigate(['/']);
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
        this.dbUsers.saveLoginGoogle(res.user?.uid ?? '');
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
}
