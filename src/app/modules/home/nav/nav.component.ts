import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ListenMenuService } from 'src/app/services/menu/listen-menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db/db.service';
import { databases } from 'src/app/services/dbNames';

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
    private router: Router,
    private db: DbService
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

  getUrl(): string {
    return this.router.url;
  }

  openSurveyModal(encuesta: any) {
    this.db
      .getDocOnce(databases.survey, this.user?.uid ?? '')
      .then(() => {
        this.signOut();
      })
      .catch(() => {
        this.modalService.open(encuesta, {
          ariaLabelledBy: 'modal-basic-title',
        });
      });
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
