import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MayoromenorRoutingModule } from './mayoromenor-routing.module';
import { MayoromenorComponent } from './mayoromenor.component';


@NgModule({
  declarations: [
    MayoromenorComponent
  ],
  imports: [
    CommonModule,
    MayoromenorRoutingModule
  ]
})
export class MayoromenorModule { }
