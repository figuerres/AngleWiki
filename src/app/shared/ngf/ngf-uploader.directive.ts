import { Directive, EventEmitter, Output, Input } from '@angular/core';
import { Http, Response, Request } from '@angular/http';
import 'rxjs/add/operator/toPromise';

//import { FileUploaderOptions, FileUploader } from "./FileUploader.class"
//import { FileItem } from './FileItem.class';


export type FilterFunction = {
  name:string,
  fn:(item?:File, options?:FileUploaderOptions)=>boolean
};




export interface FileUploaderOptions {
  forceFilename?:string;//override that all files will have defined name
  forcePostname?:string//override all FormData post names
  accept?:string;//acts like file input accept
  allowedMimeType?:Array<string>;
  allowedFileType?:Array<string>;
  autoUpload?:boolean;
  isHTML5?:boolean;
  filters?:Array<FilterFunction>;
  headers?:Array<Headers>;
  method?:string;
  authToken?:string;
  maxFileSize?:number;
  queueLimit?:number;
  removeAfterUpload?:boolean;
  url?:string;
  disableMultipart?:boolean;
  itemAlias?: string;
  authTokenHeader?: string;
  additionalParameter?:{[key: string]: any};
}







@Directive({selector: 'ngfUploader'})
export class ngfUploader  {
  //@Output('init') directiveInit:EventEmitter<ngf> = new EventEmitter()

  @Input() ref:ngfUploader
  @Output() refChange:EventEmitter<ngfUploader> = new EventEmitter()  
  @Output() done = new EventEmitter()
  @Output() success = new EventEmitter()
  @Output('catch') catcher = new EventEmitter()

  // @Input() options:FileUploaderOptions = {
  //   autoUpload: false,
  //   isHTML5: true,
  //   filters: [],
  //   removeAfterUpload: false,
  //   disableMultipart: false
  // }

  @Input() useNgHttp:any = false



  authToken:string;
  isUploading:boolean = false;
  queue:Array<File> = [];
  progress:number = 0;
  _nextIndex:number = 0;
  autoUpload:any;
  authTokenHeader: string;

  options:FileUploaderOptions = {
    autoUpload: false,
    isHTML5: true,
    filters: [],
    removeAfterUpload: false,
    disableMultipart: false
  };





  constructor(public Http:Http){
    
  }

  ngOnInit(){
    //create reference to this class with one cycle delay to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(()=>{
      this.refChange.emit(this)
      //this.directiveInit.emit(this)
    }, 0)
  }

  ngOnChanges(changes){
    if(changes.options){
     // this.setOptions(changes.options.currentValue)
    }
  }

  uploadFiles(files:File[]):Promise<any>{
    const valids:File[] = []

    files.map(file=>{
      if( this.isFileValid(file) ){
        valids.push(file)
      }
    })

    const promise:Promise<any> = this.useNgHttp ? this.ngHttpFiles( this.getFormData(valids) ) : this.xhrOneByOne(valids)

    return promise.then( response=>this.success.emit(response) )
    .catch( e=>{
      this.catcher.emit(e);
      this.done.emit(e);
      return Promise.reject(e)
    })
  }

  //old school way to send files. Still pretty handy
  xhrOneByOne(files:File[]):Promise<any[]>{
    const promises = files.map(file=>{
      const fileItem = new FileItem(this, file, this.options)
      return this._xhrTransport( fileItem )
    })
    return Promise.all(promises)
  }

  ngHttpFiles( formData:FormData ){
    const config:any = Object.assign({}, this.options)
    config.body = formData
    const request = new Request(config)
    return this.postRequest(config)
  }

  postRequest( config:Request ):Promise<Response>{
    return this.Http.request( config ).toPromise()
  }


  getFormData(files?:File[]){
    files = files ;
    //|| this.getQuedFiles()
    const formData = new FormData()
    
    for(let x=0; x < files.length; ++x){
      let filename =
      // this.options.forceFilename || 
      files[x].name;
      let alias = 
      //this.options.forcePostname || 
      'file';
      formData.append(alias, files[x], filename);
    }

    return formData
  }

  isFileValid(file:File){
    // let temp = new FileLikeObject(file);
    let temp = file;

    return this._isValidFile(temp, this.options.filters, this.options)
  }


  getFileFilterFailName(file:File):string{
    for(let x=this.options.filters.length-1; x >= 0; --x){
      if( !this.options.filters[x].fn.call(this, file, this.options) ){
        return this.options.filters[x].name
      }
    }
    return
  }

  _isValidFile(  file:File, filters:FilterFunction[], options:FileUploaderOptions ):boolean {
    if(!filters.length)return true
    return this.getFileFilterFailName(file) ? false : true
  }
}