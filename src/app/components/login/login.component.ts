import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: User = { mail: '', username: '', pass: '' };
  passCheck: string;
  submitted = false;
  constructor(private auth: AuthService, private router: Router) {
    this.passCheck = '';
    this.auth.userData.subscribe((user) => {
      //logueado, redirecciona a home
      if (user) this.router.navigate(['/']);
    });
  }

  ngOnInit(): void {}

  signIn(form: NgForm) {
    this.submitted = true;
    if (form.valid)
      this.auth.SignIn(form.form.value.mail, form.form.value.pass);
  }

  signUpGoogle() {
    this.auth.SignUpWithGoogle();
  }

  fillForm(form: NgForm) {
    this.login.mail = 'public@saladejuegos.com';
    this.login.pass = 'public';
  }

  goToSignup() {
    this.router.navigate(['signup']);
  }
}
