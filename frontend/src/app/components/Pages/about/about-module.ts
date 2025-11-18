import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing-module';
import { About } from './about/about';
import { ButtonModule } from "primeng/button";
import { TranslatePipe } from '@ngx-translate/core';


@NgModule({
  declarations: [
    About
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    ButtonModule,
    TranslatePipe
]
})
export class AboutModule { }
