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
  url: string = '';
  showMenu: Boolean;
  event$: Subscription[] = [];
  constructor(
    private auth: AuthService,
    private router: Router,
    private menuState: ListenMenuService,
    private dbUsers: UserDbService
  ) {
    this.showMenu = true;
    //current user
    this.event$.push(
      this.auth.currentUser.subscribe((user) => {
        this.user.email = user?.email ?? '';
        this.user.username = user?.displayName ?? '';
        this.uid = user?.uid ?? '';
      })
    );
    //listen menu state
    this.event$.push(
      menuState.menu.subscribe((e) => {
        this.showMenu = e;
      })
    );
    //listen url
    this.event$.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.url = event.url;
        }
      })
    );
  }

  ngOnInit(): void {}

  toggleMenu() {
    if (!this.router.url.startsWith('/home')) {
      this.router.navigate(['home']);
    }
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
    localStorage.setItem('user',JSON.stringify(null));
    this.router.navigate(['login']);
  }

  goToAbout() {
    this.router.navigate(['about']);
  }

  logIn() {
    this.router.navigate(['login']);
  }

  ngOnDestroy() {
    this.event$.forEach((e) => {
      e.unsubscribe();
    });
  }
}
