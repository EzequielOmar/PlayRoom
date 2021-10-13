import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MayoromenorRoutingModule } from './mayoromenor-routing.module';
import { MayoromenorComponent } from './mayoromenor.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MayoromenorComponent],
  imports: [CommonModule, MayoromenorRoutingModule, SharedModule],
})
export class MayoromenorModule {}
