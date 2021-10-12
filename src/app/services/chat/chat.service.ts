import { messageData } from 'src/app/interfaces/message.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { databases } from '../dbNames';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private afs: AngularFirestore) {}

  getMessages() {
    return this.afs.firestore
      .collection(databases.chat)
      .orderBy('date')
      .orderBy('time')
      .limit(50);
  }

  newMessage = async (message: messageData) => {
    await this.afs.collection(databases.chat).add(message);
  };
}
