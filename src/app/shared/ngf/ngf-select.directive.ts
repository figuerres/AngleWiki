import { Directive, ElementRef, Output, Input, HostListener, EventEmitter } from '@angular/core';
import { ngf } from "./ngf.directive"

@Directive({
  selector: '[ngfSelect]'
})
export class ngfSelect  {
  @Input() selectable:any = true
  @Input('ngfSelect') ref:ngfSelect
  @Output('ngfSelectChange') refChange:EventEmitter<ngfSelect> = new EventEmitter()


  fileElm:any
  
    @Input() multiple:string
    @Input() accept:string
    @Input() maxSize:number
    @Input() forceFilename:string
    @Input() forcePostname:string
    @Input() ngfFixOrientation:boolean = true
    @Input() fileDropDisabled=false
    @Output('init') directiveInit:EventEmitter<ngf> = new EventEmitter()
    @Input() files:Array<File> = new Array<File>();
    @Output() filesChange:EventEmitter<File[]> = new EventEmitter<File[]>();
  
    constructor(public element:ElementRef){}

    ngOnDestroy(){
      delete this.fileElm; //faster memory release of dom element
    }

    ngOnInit(){
    }

    @HostListener('change', ['$event'])
    onChange(event:Event):void {
      let files = this.element.nativeElement.files;
      console.log(" onChange(event:Event)", files );
     let  filesList:Array<File> = new Array<File>();
      for (let file of files) {
        console.log("file :",file.name);
        filesList.push(file)
      }

      if(!files.length){
         return;
      }
      console.log("stopEvent(event:any)", event );
      event.preventDefault();
      event.stopPropagation();
      this.filesChange.emit( filesList );
      this.element.nativeElement.value = '';
    }

}
