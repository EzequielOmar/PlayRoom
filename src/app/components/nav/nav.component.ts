import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userDb } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ListenMenuService } from 'src/app/services/menu/listen-menu.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  user = userDb;
  showMenu: Boolean;
  constructor(
    private auth: AuthService,
    private router: Router,
    private menuState: ListenMenuService
  ) {
    this.showMenu = true;
    menuState.menu.subscribe((e) => {
      this.showMenu = e;
    });
  }

  ngOnInit(): void {}

  toggleMenu() {
    this.showMenu
      ? this.menuState.toggleMenu(false)
      : this.menuState.toggleMenu(true);
  }

  goHome() {
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
