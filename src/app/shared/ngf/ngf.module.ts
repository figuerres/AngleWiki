import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ HttpModule } from '@angular/http';


import { ngfBackground } from './ngf-background.directive';
import { ngfSelect } from './ngf-select.directive';



const declarations = [
  ngfSelect,
  ngfBackground
]

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: declarations,
  exports: [HttpModule, ...declarations]
}) 
export class ngfModule {}



