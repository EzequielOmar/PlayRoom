import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AhorcadoRoutingModule } from './ahorcado-routing.module';
import { AhorcadoComponent } from './ahorcado.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AhorcadoComponent],
  imports: [CommonModule, AhorcadoRoutingModule, MaterialModule, SharedModule],
})
export class AhorcadoModule {}
