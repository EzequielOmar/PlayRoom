import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListenMenuService {
  menu: Subject<Boolean>;

  constructor() {
    this.menu = new Subject<Boolean>();
    this.toggleMenu(true);
  }

  toggleMenu(value: boolean) {
    this.menu.next(value);
  }
}
