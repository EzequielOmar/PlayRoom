import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { I_UserDb } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-pass-recovery',
  templateUrl: './pass-recovery.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class PassRecoveryComponent implements OnInit {
  login: I_UserDb = { email: '', username: '', createdAt: '' };
  submitted = false;
  spinner = false;
  error = '';
  success = '';
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  recovery(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.spinner = true;
      this.auth
        .passRecovery(form.form.value.email)
        .then(() => {
          this.success =
            'El email a sido enviado correctamente, chequea tu casilla de mensajes.';
        })
        .catch((error) => (this.error = error))
        .finally(() => {
          this.spinner = false;
        });
    }
  }
}
