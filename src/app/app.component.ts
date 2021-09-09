import { Component, OnDestroy } from '@angular/core';
import { userDb } from './interfaces/user';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  //private sub?;
  title = 'SalaDeJuegos';
  logged = false;
  user = userDb;
  constructor(private auth: AuthService) {
    //this.sub = this.auth.userData.subscribe((user) => {
    //  if (user?.email) {
    //    this.user.email = user.email;
    //  } else {
    //    this.user = userDb;
    //  }
    //});
  }

  ngOnDestroy() {
  //  this.sub?.unsubscribe();
  }
}
