import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Message, messageData } from 'src/app/interfaces/message.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild('scroll') private scrollContainer: ElementRef = {} as ElementRef;
  @ViewChild('input') private input: ElementRef = {} as ElementRef;
  user: firebase.User | null;
  messages: Message[] = [];
  error: string = '';
  constructor(private chatDb: ChatService, private auth: AuthService) {
    this.user = this.auth.currentUser;
  }

  ngOnInit(): void {
    //limpia el array de mensaje y obtiene los ultimos 50
    //cada vez que se carga un mensaje nuevo
    //por ultimo scrollea el div
    this.chatDb.getMessages().onSnapshot((snap) => {
      this.messages = [];
      snap.forEach((child: any) => {
        this.messages.push({ id: child.id, data: child.data() });
      });
      setTimeout(() => {
        this.scrollToBottom();
      }, 500);
    });
  }

  send(input: string) {
    this.input.nativeElement.value = '';
    if (!this.user) {
      this.error = 'Solo usuarios logueados pueden usar el chat';
      return;
    }
    let message: messageData = {
      message: input,
      uid: this.user?.uid ?? '',
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      username: this.user.displayName ?? '',
    };
    this.chatDb.newMessage(message);
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer?.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }
}
