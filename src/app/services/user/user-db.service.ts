import { Injectable } from '@angular/core';
import { DbService } from '../db/db.service';
import { databases } from '../db/const';
import { I_UserDb } from 'src/app/interfaces/user';
import { events, I_logDb } from 'src/app/interfaces/log';

@Injectable({
  providedIn: 'root',
})
export class UserDbService {
  private user: I_UserDb = { email: '', username: '', createdAt: '' };
  private log: I_logDb = { event: '', uid: '', datetime: '' };
  constructor(private db: DbService) {}

  /**
   * Guarda el nuevo usuario (creado con email y pass) en la coleccion usuarios documento -> uid
   * Guarda el evento de creacion de usuario en la coleccion logs documento nombre random.
   * @param uid user id
   * @param uemail user email
   * @param uname username
   */
  saveNewUserEmailPass(uid: string, uemail: string, uname?: string) {
    this.user.createdAt = new Date().toJSON();
    this.user.email = uemail;
    this.user.username = uname ?? '';
    this.db.setWithId(databases.users, uid, this.user);
    this.log.datetime = new Date().toJSON();
    this.log.event = events.signUp;
    this.log.uid = uid;
    this.db.set(databases.logs, this.log);
  }

  /**
   * Guarda el nuevo usuario (creado con google) en la coleccion usuarios documento -> uid
   * Guarda el evento de creacion de usuario en la coleccion logs documento nombre random.
   * @param uid user id
   * @param uemail user email
   * @param uname username
   */
  saveNewUserGoogle(uid: string, uemail: string, uname?: string) {
    this.user.createdAt = new Date().toJSON();
    this.user.email = uemail;
    this.user.username = uname ?? '';
    this.db.setWithId(databases.users, uid, this.user);
    this.log.datetime = new Date().toJSON();
    this.log.event = events.signUpGoogle;
    this.log.uid = uid;
    this.db.set(databases.logs, this.log);
  }

  /**
   * Guarda el nuevo usuario (creado con twitter) en la coleccion logs documento nombre random.
   * @param uid user id
   * @param uemail user email
   * @param uname username
   */
  saveNewUserTwitter(uid: string, uemail: string, uname?: string) {
    this.user.createdAt = new Date().toJSON();
    this.user.email = uemail;
    this.user.username = uname ?? '';
    this.db.setWithId(databases.users, uid, this.user);
    this.log.datetime = new Date().toJSON();
    this.log.event = events.signUpTwitter;
    this.log.uid = uid;
    this.db.set(databases.logs, this.log);
  }

  /**
   * Guarda el evento de login con email and pass, en coleccion logs documento nombre random.
   * @param uid user id
   */
  saveLoginEmailPass(uid: string) {
    this.log.datetime = new Date().toJSON();
    this.log.event = events.logIn;
    this.log.uid = uid;
    this.db.set(databases.logs, this.log);
  }

  /**
   * Guarda el evento de login con google, en coleccion logs documento nombre random.
   * @param uid user id
   */
  saveLoginGoogle(uid: string) {
    this.log.datetime = new Date().toJSON();
    this.log.event = events.logInGoogle;
    this.log.uid = uid;
    this.db.set(databases.logs, this.log);
  }

  /**
   * Guarda el evento de login con twitter, en coleccion logs documento nombre random.
   * @param uid user id
   */
  saveLoginTwitter(uid: string) {
    this.log.datetime = new Date().toJSON();
    this.log.event = events.logInTwitter;
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
