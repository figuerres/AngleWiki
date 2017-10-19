import { Directive, ElementRef, Output, Input, HostListener, EventEmitter } from '@angular/core';
import { ngf } from "./ngf.directive"

@Directive({
  selector: '[ngfSelect]'
})
export class ngfSelect  {
  @Input() selectable:any = true
  @Input('ngfSelect') ref:ngfSelect
  @Output('ngfSelectChange') refChange:EventEmitter<ngfSelect> = new EventEmitter()
  @Input() multiple:string
  @Input() accept:string
  @Output() filesChange:EventEmitter<File[]> = new EventEmitter<File[]>();
  fileElm:any;

  constructor(public element:ElementRef){}

  ngOnDestroy(){
    delete this.fileElm; //faster memory release of dom element
  }

  ngOnInit(){
  }

  @HostListener('change', ['$event'])
  onChange(event:Event):void {
    let files = this.element.nativeElement.files;
    if(!files.length){
      return;
    }
    let  filesList:Array<File> = new Array<File>();
    for (let file of files) {
      filesList.push(file)
    }
    this.filesChange.emit( filesList );
    event.preventDefault();
    event.stopPropagation();
    this.element.nativeElement.value = '';
  }

}
