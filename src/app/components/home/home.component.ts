import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userData: Observable<firebase.User | null>;

  constructor(private auth: AuthService,private router: Router) {
    this.userData = this.auth.userData;
  }

  ngOnInit(): void {
  }

  signOut() {
    this.auth.SignOut();
    this.router.navigate(['login']);
  }

  goToAbout(){
    this.router.navigate(['about']);
  }

}
