import { Injectable } from '@angular/core';
import { DbService } from '../db/db.service';
import { databases } from '../db/const';
import { I_UserDb } from 'src/app/interfaces/user.interface';
import { events, I_logDb } from 'src/app/interfaces/log.interface';

@Injectable({
  providedIn: 'root',
})
export class UserDbService {
  private user: I_UserDb = { email: '', username: '', createdAt: '' };
  private log: I_logDb = { event: '', uid: '', datetime: '' };
  constructor(private db: DbService) {}

  /**
   * Guarda el nuevo usuario en la coleccion usuarios documento -> uid
   * Guarda el evento de creacion de usuario en la coleccion logs documento nombre random.
   * @param uid user id
   * @param uemail user email
   * @param event evento (interface de evento)
   * @param uname? username (opcional)
   */
  saveNewUser(uid: string, uemail: string, event: string, uname?: string) {
    this.user.createdAt = new Date().toJSON();
    this.user.email = uemail;
    this.user.username = uname ?? '';
    this.db.setWithId(databases.users, uid, this.user);
    this.log.datetime = new Date().toJSON();
    this.log.event = event;
    this.log.uid = uid;
    this.db.set(databases.logs, this.log);
  }

  /**
   * Guarda el evento de login, en coleccion logs documento nombre random.
   * @param uid user id
   * @param event evento (interface de evento)
   */
  saveLogin(uid: string, event: string) {
    this.log.datetime = new Date().toJSON();
    this.log.event = event;
    this.log.uid = uid;
    this.db.set(databases.logs, this.log);
  }

  /**
   * Guarda el evento de logout, en coleccion logs documento nombre random.
   * @param uid user id
   */
  saveLogout(uid: string) {
    this.log.datetime = new Date().toJSON();
    this.log.event = events.logOut;
    this.log.uid = uid;
    this.db.set(databases.logs, this.log);
  }

  exists(uid: string) {
    let res = false;
    this.db.getDocOnce(databases.users, uid).then(() => {
      res = true;
    });
    return res;
  }
}
