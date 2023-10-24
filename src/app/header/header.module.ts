import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header.component";
import {RouterOutlet} from "@angular/router";
import {AuthHeaderComponent} from "./auth-header/auth-header.component";



@NgModule({
  declarations: [
    HeaderComponent,
    AuthHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
