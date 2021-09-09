import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Input() user: any;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  goHome(){
    this.router.navigate(['home']);
  }

  signOut() {
    this.auth.signOut();
    this.router.navigate(['login']);
  }

  goToAbout() {
    this.router.navigate(['about']);
  }
}
