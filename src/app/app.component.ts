import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'SalaDeJuegos';
  constructor(private auth: AuthService) {
    setInterval(() => {
      console.log(this.auth.currentUser);
    }, 3000);
  }

  ngOnDestroy() {}
}
