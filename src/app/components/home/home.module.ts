import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayoromenorComponent } from './mayoromenor/mayoromenor.component';
import { LobbyComponent } from './lobby/lobby.component';
import { ChatComponent } from './lobby/chat/chat.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AhorcadoComponent,
    MayoromenorComponent,
    LobbyComponent,
    ChatComponent,
  ],
})
export class HomeModule {}
