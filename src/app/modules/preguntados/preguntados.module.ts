import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreguntadosRoutingModule } from './preguntados-routing.module';
import { PreguntadosComponent } from './preguntados.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [PreguntadosComponent],
  imports: [CommonModule, PreguntadosRoutingModule, MaterialModule],
})
export class PreguntadosModule {}
