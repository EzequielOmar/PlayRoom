import { Component, OnInit, ViewChild } from '@angular/core';
import { userDb } from 'src/app/interfaces/user';
import { ListenMenuService } from 'src/app/services/menu/listen-menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('menu') menu: any;
  constructor(private menuState: ListenMenuService) {
    this.menuState.menu.subscribe(() => {
      this.toggleMenu();
    });
  }

  toggleMenu() {
    this.menu.toggle();
  }
}
