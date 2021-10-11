import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ListenMenuService } from 'src/app/services/menu/listen-menu.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  user?: firebase.User | null;
  uid: string = '';
  showMenu: Boolean;
  sub?: Subscription;
  constructor(
    private auth: AuthService,
    private router: Router,
    private menuState: ListenMenuService
  ) {
    this.showMenu = true;
    //listen menu state
    this.sub = menuState.menu.subscribe((e) => {
      this.showMenu = e;
    });
  }

  ngOnInit(): void {
    this.checkUserOrRedirect();
  }

  toggleMenu() {
    this.showMenu
      ? this.menuState.toggleMenu(false)
      : this.menuState.toggleMenu(true);
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private checkUserOrRedirect() {
    this.user = this.auth.currentUser;
    setTimeout(() => {
      if (!this.user) this.signOut();
    }, 1000);
  }
}
