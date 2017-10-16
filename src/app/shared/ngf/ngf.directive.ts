import { Directive, EventEmitter, ElementRef, Input, Output, HostListener } from '@angular/core';
// import { createInvisibleFileInputWrap, isFileInput, detectSwipe } from "./doc-event-help.functions"
//import { FileUploader } from './FileUploader.class';

@Directive({selector: '[ngf]'})
export class ngf {
  fileElm:any

  @Input() multiple:string
  @Input() accept:string
  @Input() maxSize:number
  @Input() forceFilename:string
  @Input() forcePostname:string
  @Input() ngfFixOrientation:boolean = true

  @Input() fileDropDisabled=false
  @Input() selectable = false
  @Output('init') directiveInit:EventEmitter<ngf> = new EventEmitter()
  @Input('ngf') ref:ngf
  @Output('ngfChange') refChange:EventEmitter<ngf> = new EventEmitter()
  
  //deprecated
  //@Input() uploader:FileUploader = new FileUploader({});

  @Input() lastInvalids:{file:File,type:string}[] = []
  @Output() lastInvalidsChange:EventEmitter<{file:File,type:string}[]> = new EventEmitter()

  @Input() lastBaseUrl:string//base64 last file uploaded url
  @Output() lastBaseUrlChange:EventEmitter<string> = new EventEmitter()
  
  @Input() file:File//last file uploaded
  @Output() fileChange:EventEmitter<File> = new EventEmitter()

  @Input() files:Array<File> = new Array<File>();
  @Output() filesChange:EventEmitter<File[]> = new EventEmitter<File[]>();

  constructor(public element:ElementRef){}

  ngOnDestroy(){
    delete this.fileElm//faster memory release of dom element
  }

  ngOnInit(){
    // if( this.selectable ){
    //   this.enableSelecting()
    // }

    // if( this.multiple ){
    //   this.paramFileElm().setAttribute('multiple', this.multiple)
    // }

    // if( this.accept ){
    //  // this.uploader.options.accept = this.accept
    //   this.paramFileElm().setAttribute('accept', this.accept)
    // }

    // if( this.maxSize ){
    //  // this.uploader.options.maxFileSize = this.maxSize
    // }

    // if( this.forceFilename ){
    //  // this.uploader.options.forceFilename = this.forceFilename
    // }

    // if( this.forcePostname ){
    // //  this.uploader.options.forcePostname = this.forcePostname
    // }

    // //create reference to this class with one cycle delay to avoid ExpressionChangedAfterItHasBeenCheckedError
    // setTimeout(()=>{
    //   this.refChange.emit(this)
    //   this.directiveInit.emit(this)
    // }, 0)
  }

  // paramFileElm(){
  //   if( this.fileElm )return this.fileElm//already defined
    
  //   //elm is a file input
  //   const isFile = isFileInput( this.element.nativeElement )
  //   if(isFile)return this.fileElm = this.element.nativeElement
    
  //   //create foo file input
  //   const label = createInvisibleFileInputWrap()
  //   this.fileElm = label.getElementsByTagName('input')[0]
  //   this.fileElm.addEventListener('change', this.changeFn.bind(this));
  //   this.element.nativeElement.appendChild( label )
  //   return this.fileElm
  // }

  // enableSelecting(){
  //   let elm = this.element.nativeElement

  //   if( isFileInput(elm) )return

  //   const bindedHandler = this.clickHandler.bind(this)
  //   elm.addEventListener('click', bindedHandler)
  //   elm.addEventListener('touchstart', bindedHandler)
  //   elm.addEventListener('touchend', bindedHandler)
  // }

  getOptions():any {
   // return this.uploader.options;
  }

  getFilters():any {
    return {};
  }

  handleFiles(files:File[]){
  //  const valids = this.uploader.getValidFiles(files)
    
  //   if(files.length!=valids.length){
  //    // this.lastInvalids = this.uploader.getInvalidFiles(files)
  //   }else{
       this.lastInvalids = null;
  //   }
    
    this.lastInvalidsChange.emit(this.lastInvalids);

    // if( valids.length ){
    //   if( this.ngfFixOrientation ){
    //   //  this.applyExifRotations(valids)
    //   //  .then( fixedFiles=>this.que(fixedFiles) )
    //   }else{
    //    // this.que(valids)
    //   }
    // }
    this.que(files);

    if (this.isEmptyAfterSelection()) {
      this.element.nativeElement.value = '';
    }
  }

  que(fileList:File[]){
   // this.uploader.addToQueue(files);
console.log(" que(files:File[])", fileList);
for (let file of fileList) {
  console.log("file :",file.name);
 this.files.push(file);
}

   //this.files = files;
   console.log(" this.files", this.files);

    this.filesChange.emit( this.files=fileList );
    
    if(fileList.length){
      this.fileChange.emit( this.file=fileList[0] )

      if(this.lastBaseUrlChange.observers.length){
       // this.uploader.dataUrl( files[0] )
      //  .then( url=>this.lastBaseUrlChange.emit(url) )
      }
    }
  }

  changeFn(event:any) {
    var fileList = event.__files_ || (event.target && event.target.files), files = [];
console.log("changeFn(event:any)", fileList);
    if (!fileList) return;

    this.stopEvent(event);
    // this.handleFiles(fileList)
  }

  // clickHandler(evt:any){
  //   const elm = this.element.nativeElement
  //   if (elm.getAttribute('disabled') || this.fileDropDisabled){
  //     return false;
  //   }
  //   var r = detectSwipe(evt);
  //   // prevent the click if it is a swipe
  //   if (r != null) return r;
  //   const fileElm = this.paramFileElm()
  //   fileElm.click()
  //   //fileElm.dispatchEvent( new Event('click') );
  //   return false;
  // }

  isEmptyAfterSelection():boolean {
    return !!this.element.nativeElement.attributes.multiple;
  }

  eventToTransfer(event:any):any {
    console.log(" eventToTransfer(event:any)", event );
    if(event.dataTransfer){
      return event.dataTransfer;
    }
    
    return  event.originalEvent ? event.originalEvent.dataTransfer : null;
  }

  stopEvent(event:any):any {
    console.log("stopEvent(event:any)", event );
    event.preventDefault();
    event.stopPropagation();

  }

  transferHasFiles(transfer:any):any {
    if (!transfer.types) {
      return false;
    }

    if (transfer.types.indexOf) {
      return transfer.types.indexOf('Files') !== -1;
    } else if (transfer.types.contains) {
      return transfer.types.contains('Files');
    } else {
      return false;
    }
  }

  eventToFiles(event:Event){
    console.log(" eventToFiles(event:Event)", event );
    let transfer = this.eventToTransfer(event);
    if(transfer.files && transfer.files.length){
      return transfer.files;
    }
  
    if(transfer.items && transfer.items.length){
      return transfer.items;
    }
     
    return []
  }

  // applyExifRotations(files:File[]):Promise<File[]>{
  //  // const mapper = (file:File,index:number):Promise<any>=>{
  //    // return this.uploader.applyExifRotation(file)
  //    // .then( fixedFile=>files.splice(index, 1, fixedFile) )
  //   //}

  //   const proms = []
  //   for(let x=files.length-1; x >= 0; --x){
  //     proms[x] = mapper( files[x], x )
  //   }
  //   return Promise.all( proms ).then( ()=>files )
  // }

  @HostListener('change', ['$event'])
  onChange(event:Event):void {
    let files = this.element.nativeElement.files || this.eventToFiles(event)
console.log(" onChange(event:Event)", files );
    if(!files.length){
       return;
    }
   

    this.stopEvent(event);

    this.handleFiles(files);
  }
}