import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  spinner = false;
  error = '';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      pass: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  logIn() {
    this.submitted = true;
    if (this.form.valid) {
      this.spinner = true;
      this.auth
        .signIn(
          this.form.controls['email'].value,
          this.form.controls['pass'].value
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

  signUpGoogle() {
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

  fillForm(type: string) {
    if (type === 'admin') {
      this.form.controls['email'].setValue('admin@saladejuegos.com');
      this.form.controls['pass'].setValue('admin1');
    } else {
      this.form.controls['email'].setValue('public@saladejuegos.com');
      this.form.controls['pass'].setValue('public');
    }
  }

  goToSignup() {
    this.router.navigate(['/auth/signup']);
  }

  goToRecovery() {
    this.router.navigate(['/auth/recovery']);
  }

  private redirect() {
    this.router.navigate(['/home']);
  }
}
