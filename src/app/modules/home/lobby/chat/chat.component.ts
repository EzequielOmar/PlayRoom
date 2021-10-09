import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { I_UserSession } from 'src/app/interfaces/user.interface';
import { ChatService } from 'src/app/services/chat/chat.service';
import { I_Message } from 'src/app/interfaces/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild('scroll') private scrollContainer: ElementRef = {} as ElementRef;
  @ViewChild('input') private input: ElementRef = {} as ElementRef;
  user: I_UserSession | null;
  messages: any[] = [];
  error: string = '';
  constructor(private chatDb: ChatService) {
    localStorage.getItem('user')
      ? (this.user = JSON.parse(localStorage.getItem('user') ?? ''))
      : (this.user = null);
  }

  ngOnInit(): void {
    //limpia el array de mensaje y obtiene los ultimos 50
    //cada vez que se carga un mensaje nuevo
    //por ultimo scrollea el div
    this.chatDb.getMessages().onSnapshot((snap) => {
      this.messages = [];
      snap.forEach((child: any) => {
        this.messages.push(child.data());
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
    let message: I_Message = {
      message: input,
      uid: this.user?.uid ?? '',
      datetime: new Date().toJSON(),
      username: this.user.username,
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
