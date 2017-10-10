import { Directive, ElementRef, Output, Input, HostListener, EventEmitter } from '@angular/core';
import { ngf } from "./ngf.directive"

@Directive({
  selector: '[ngfSelect]'
})
export class ngfSelect extends ngf {
  @Input() selectable:any = true
  @Input('ngfSelect') ref:ngfSelect
  @Output('ngfSelectChange') refChange:EventEmitter<ngfSelect> = new EventEmitter()
}
