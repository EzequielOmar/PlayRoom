import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { databases } from '../db/const';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chats: Message[] = [];
  constructor(private afs: AngularFirestore) {}

  getMessages() {
    this.afs
      .collection<Message>(databases.chat, (ref) =>
        ref.orderBy('datetime', 'asc').limit(50)
      )
      .valueChanges()
      .subscribe((snapshot) => {
        this.chats = [];
        this.chats = this.snapshotToArray(snapshot);
        console.log(this.chats);
      });
  }

  /**
   * recibe un snapshot y retorna un array
   * @param snapshot snapshot de db
   * @returns
   */
  private snapshotToArray(snapshot: any): Array<any> {
    const returnArr: any[] = [];
    // snapshot.forEach((childSnapshot: any) => {
    //   //const item = childSnapshot. .data();
    //   item.key = childSnapshot.key;
    //   returnArr.push(item);
    // });
    return returnArr;
  }
}
