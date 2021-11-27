import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ListenMenuService } from 'src/app/services/menu/listen-menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnDestroy {
  user?: User;
  uid: string = '';
  showMenu: Boolean;
  sub?: Subscription;

  constructor(
    private auth: AuthService,
    private menuState: ListenMenuService,
    private modalService: NgbModal,
    private us: UserService,
    private router: Router
  ) {
    this.showMenu = true;
    //listen menu state
    this.sub = menuState.menu.subscribe((e) => {
      this.showMenu = e;
    });
    //get user
    this.us.getUser(this.auth.currentUser?.uid ?? '').then((u: any) => {
      this.user = { uid: u.id, data: u.data() };
    });
  }

  openSurveyModal(encuesta: any) {
    this.modalService.open(encuesta, { ariaLabelledBy: 'modal-basic-title' });
  }

  toggleMenu() {
    this.showMenu
      ? this.menuState.toggleMenu(false)
      : this.menuState.toggleMenu(true);
  }

  signOut() {
    this.modalService.dismissAll();
    this.auth.signOut(this.user?.uid ?? '').then(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
