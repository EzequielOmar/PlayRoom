import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayoromenorComponent } from './mayoromenor/mayoromenor.component';
import { LobbyComponent } from './lobby/lobby.component';
import { ChatComponent } from './lobby/chat/chat.component';
import { MaterialModule } from 'src/app/material.module';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { HttpClientModule } from '@angular/common/http';
import { SopadeletrasComponent } from './sopadeletras/sopadeletras.component';
import { TimerComponent } from './common/timer/timer.component';

@NgModule({
  imports: [CommonModule, MaterialModule, HttpClientModule],
  declarations: [
    AhorcadoComponent,
    MayoromenorComponent,
    LobbyComponent,
    ChatComponent,
    PreguntadosComponent,
    SopadeletrasComponent,
    TimerComponent,
  ],
})
export class HomeModule {}
