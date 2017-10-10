import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgfDirective } from './ngf.directive';
import { NgfBackgroundDirective } from './ngf-background.directive';
import { NgfSelectDirective } from './ngf-select.directive';
import { NgfDropDirective } from './ngf-drop.directive';
import { NgfUploaderDirective } from './ngf-uploader.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgfDirective, NgfBackgroundDirective, NgfSelectDirective, NgfDropDirective, NgfUploaderDirective]
})
export class NgfModule { }
