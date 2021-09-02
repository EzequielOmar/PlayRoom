import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class SignupComponent implements OnInit {
  signup: User = { mail: '', username: '', pass: '' };
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

  signUp(form: NgForm) {
    this.submitted = true;
    if (form.valid && this.signup.pass === this.passCheck)
      this.auth.SignUp(form.form.value.mail, form.form.value.pass);
  }

  signUpGoogle() {
    this.auth.SignUpWithGoogle();
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
