import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { I_UserDb } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ListenMenuService } from 'src/app/services/menu/listen-menu.service';
import { UserDbService } from 'src/app/services/user/user-db.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  user: I_UserDb = { email: '', username: '', createdAt: '' };
  uid: string = '';
  showMenu: Boolean;
  constructor(
    private auth: AuthService,
    private router: Router,
    private menuState: ListenMenuService,
    private dbUsers: UserDbService
  ) {
    this.showMenu = true;
    this.auth.currentUser.subscribe((user) => {
      this.user.email = user?.email ?? '';
      this.user.username = user?.displayName ?? '';
      this.uid = user?.uid ?? '';
    });
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
    this.dbUsers.saveLogout(this.uid);
    this.router.navigate(['login']);
  }

  goToAbout() {
    this.router.navigate(['about']);
  }

  logIn() {
    this.router.navigate(['login']);
  }
}
