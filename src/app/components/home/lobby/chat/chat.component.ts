import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { databases } from 'src/app/services/db/const';
import { DbService } from 'src/app/services/db/db.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit{
  //sub: Observable<Message[]>;
  messages: Message[] = [];
  uid = '';
  constructor(private chatDb: ChatService, private auth: AuthService) {
    this.chatDb.getMessages();
  }

  ngOnInit(): void {
    //this.sub.subscribe((data:Message) => {
    //  this.messages.push(data;
    //});
    this.auth.currentUser.subscribe((u) => {
      this.uid = u?.uid ?? '';
    });
  }
}
