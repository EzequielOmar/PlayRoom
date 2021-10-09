import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SopadeletrasRoutingModule } from './sopadeletras-routing.module';
import { SopadeletrasComponent } from './sopadeletras.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [SopadeletrasComponent],
  imports: [
    CommonModule,
    SopadeletrasRoutingModule,
    MaterialModule,
    SharedModule,
  ],
})
export class SopadeletrasModule {}
