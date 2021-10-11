import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  spinner = false;
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      username: [''],
      password: ['', Validators.required],
      passCheck: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  signUp() {
    this.submitted = true;
    if (
      this.form.valid &&
      this.form.controls['passCheck'].value ===
        this.form.controls['password'].value
    ) {
      this.spinner = true;
      this.auth
        .signUp(
          this.form.controls['email'].value,
          this.form.controls['password'].value,
          this.form.controls['username'].value
        )
        .then(() => {
          this.redirect();
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
      .then(() => {
        this.redirect();
      })
      .catch((error) => (this.error = error))
      .finally(() => {
        this.spinner = false;
      });
  }

  signUpWithTwitter() {
    this.auth
      .signUpWithTwitter()
      .then(() => {
        this.redirect();
      })
      .catch((error) => (this.error = error))
      .finally(() => {
        this.spinner = false;
      });
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  private redirect() {
    this.router.navigate(['/home']);
  }
}
