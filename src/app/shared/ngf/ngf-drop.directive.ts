import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
// import { createInvisibleFileInputWrap, isFileInput, detectSwipe } from "./doc-event-help.functions"
// import { FileUploader } from './FileUploader.class';
import { ngf } from "./ngf.directive"

@Directive({selector: '[ngfDrop]'})
export class ngfDrop extends ngf {
  @Input('ngfDrop') ref:ngfDrop
  @Output('ngfDropChange') refChange:EventEmitter<ngfDrop> = new EventEmitter()  
  @Output() fileOver:EventEmitter<any> = new EventEmitter();

  @Input() validDrag = false
  @Output() validDragChange:EventEmitter<boolean> = new EventEmitter()

  @Input() invalidDrag = false
  @Output() invalidDragChange:EventEmitter<boolean> = new EventEmitter()

  @HostListener('drop', ['$event'])
  onDrop(event:Event):void {
    this.closeDrags()
    let files = this.eventToFiles(event)

    if(!files.length)return

    this.stopEvent(event);
    this.handleFiles(files)
  }

  handleFiles(files:File[]){
    this.fileOver.emit(false)//turn-off dragover
    //super.handleFiles(files)
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event:Event):void {
    let files = this.eventToFiles(event)

    if(!files.length)return
    
   // this.validDrag = this.uploader.isFilesValid(files)
    this.validDragChange.emit(this.validDrag)
    this.invalidDrag = !this.validDrag
    this.invalidDragChange.emit(this.invalidDrag)

    this.eventToTransfer(event).dropEffect = 'copy';
    this.stopEvent(event);
    this.fileOver.emit(true);
  }

  closeDrags(){
    this.validDrag = false
    this.validDragChange.emit(this.validDrag)
    this.invalidDrag = false
    this.invalidDragChange.emit(this.invalidDrag)
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event:Event):any {
    this.closeDrags()

    if ((this as any).element) {
      if (event.currentTarget === (this as any).element[0]) {
        return;
      }
    }

    this.stopEvent(event);
    this.fileOver.emit(false);
  }
}