import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ HttpModule } from '@angular/http';

import { ngf } from './ngf.directive';
import { ngfBackground } from './ngf-background.directive';
import { ngfSelect } from './ngf-select.directive';
import { ngfDrop } from './ngf-drop.directive';
import { ngfUploader } from './ngf-uploader.directive';


const declarations = [
  ngfDrop,
  ngfSelect,
  ngfBackground,
  ngfUploader,
  ngf
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



