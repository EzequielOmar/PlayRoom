import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//router
import { HomeRoutingModule } from './home-routing.module';
//components
import { HomeComponent } from './home.component';
import { NavComponent } from './nav/nav.component';
import { ChatComponent } from './lobby/chat/chat.component';
import { LobbyComponent } from './lobby/lobby.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyComponent } from './survey/survey.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataComponent } from './data/data.component';
import { UidNamePipePipe } from '../../pipes/uid-name-pipe.pipe';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgbModule,
    ChartsModule,
  ],
  declarations: [
    HomeComponent,
    LobbyComponent,
    ChatComponent,
    NavComponent,
    SurveyComponent,
    DataComponent,
    UidNamePipePipe,
  ],
  exports: [],
})
export class HomeModule {}
