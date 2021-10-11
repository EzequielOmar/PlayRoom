import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-pass-recovery',
  templateUrl: './pass-recovery.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class PassRecoveryComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  spinner = false;
  response = '';
  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  recovery() {
    this.submitted = true;
    if (this.form.valid) {
      this.spinner = true;
      this.auth
        .passRecovery(this.form.controls['email'].value)
        .then(() => {
          this.response =
            'El email a sido enviado correctamente, chequea tu casilla de mensajes.';
        })
        .catch((error) => (this.response = error))
        .finally(() => {
          this.spinner = false;
        });
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
