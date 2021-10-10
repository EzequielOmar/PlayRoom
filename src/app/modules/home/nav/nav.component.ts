import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { I_UserDb } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ListenMenuService } from 'src/app/services/menu/listen-menu.service';
import { UserDbService } from 'src/app/services/user/user-db.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  user: I_UserDb = { email: '', username: '', createdAt: '' };
  uid: string = '';
  showMenu: Boolean;
  sub?: Subscription;
  constructor(
    private auth: AuthService,
    private dbUsers: UserDbService,
    private router: Router,
    private menuState: ListenMenuService
  ) {
    this.showMenu = true;
    //current user
    if (this.auth.authenticated) {
      this.user.email = this.auth.currentUser?.email ?? '';
      this.user.username = this.auth.currentUser?.displayName ?? '';
      this.uid = this.auth.currentUser?.uid ?? '';
    }
    //listen menu state
    this.sub = menuState.menu.subscribe((e) => {
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
    this.router.navigate(['home/menuList:about']);
  }

  signOut() {
    this.auth.signOut();
    this.dbUsers.saveLogout(this.uid);
    localStorage.setItem('user', JSON.stringify(null));
    this.router.navigate(['login']);
  }

  goToAbout() {
    this.router.navigate(['about']);
  }

  logIn() {
    this.router.navigate(['login']);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
