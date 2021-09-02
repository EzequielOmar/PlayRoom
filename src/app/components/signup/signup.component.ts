import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {
    this.auth.userData.subscribe((user) => {
      //logueado, redirecciona a home
      if (user) this.router.navigate(['/']);
    });
  }

  ngOnInit(): void {}

  signUp() {
    //this.auth.SignUp('test@gmail.com', 'testing');

    this.auth.SignOut();
  }

  signUpGoogle() {
    this.auth.SignUpWithGoogle();
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
