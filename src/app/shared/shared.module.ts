import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { FiltroKanaComponent } from './filtro-kana/filtro-kana.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FiltroKanaComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    FiltroKanaComponent,
    MaterialModule
  ]
})
export class SharedModule { }
