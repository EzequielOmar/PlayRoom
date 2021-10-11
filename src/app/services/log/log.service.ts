import { Injectable } from '@angular/core';
import { DbService } from '../db/db.service';
import { databases } from '../dbNames';
import { Log } from 'src/app/interfaces/log.interface';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private log: Log = { event: '', uid: '', datetime: '' };
  constructor(private db: DbService) {}

  /**
   * Guarda el evento, en coleccion logs documento nombre random.
   * @param uid user id
   * @param event evento (interface de evento)
   */
  saveEvent(uid: string, event: string) {
    this.log.datetime = new Date().toLocaleString();
    this.log.event = event;
    this.log.uid = uid;
    this.db.set(databases.logs, this.log);
  }
}
