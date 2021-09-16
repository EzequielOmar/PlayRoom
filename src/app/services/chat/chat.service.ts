import { I_Message } from 'src/app/interfaces/message.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { databases } from '../db/const';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private afs: AngularFirestore) {}

  getMessages(){
    return this.afs.firestore
      .collection(databases.chat)
      .orderBy('datetime', 'asc')
      .limit(50);
  };

  newMessage = async (message: I_Message) => {
    await this.afs.collection(databases.chat).add(message);
  };
}
