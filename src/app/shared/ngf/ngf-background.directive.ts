import { Directive, ElementRef, Input } from '@angular/core';

function getWindow():any{return window}

@Directive({
  selector: '[ngfBackground]'
})
export class ngfBackgroundDirective {
  @Input('ngfBackground') file:any

  constructor(public ElementRef:ElementRef) { 
  }

  ngOnChanges(changes:any){
    this.dataUrl(this.file)
    .then( (src:any)=>this.ElementRef.nativeElement.style.backgroundImage = 'url(\'' + (src || '') + '\')' )
  }

  
  /** converts file-input file into base64 dataUri */
  private  dataUrl(file:any, disallowObjectUrl?:any):Promise<string>{
    if (!file) return Promise.resolve(file)
    
    if ((disallowObjectUrl && file.$ngfDataUrl != null) || (!disallowObjectUrl && file.$ngfBlobUrl != null)) {
      return Promise.resolve( disallowObjectUrl ? file.$ngfDataUrl : file.$ngfBlobUrl )
    }
  
    var p = disallowObjectUrl ? file.$$ngfDataUrlPromise : file.$$ngfBlobUrlPromise;
    if (p) return p;
  
    const win = getWindow()
    let deferred:Promise<any> = Promise.resolve()
    if (win.FileReader && file &&
      (!win.FileAPI || navigator.userAgent.indexOf('MSIE 8') === -1 || file.size < 20000) &&
      (!win.FileAPI || navigator.userAgent.indexOf('MSIE 9') === -1 || file.size < 4000000)) {
      //prefer URL.createObjectURL for handling refrences to files of all sizes
      //since it doesn´t build a large string in memory
      var URL = win.URL || win.webkitURL;
      if (FileReader) {
        deferred = new Promise((res,rej)=>{
          var fileReader = new FileReader();
          fileReader.onload = function (event:any) {
            file.$ngfDataUrl = event.target.result;
            delete file.$ngfDataUrl;
            res( event.target.result )
          };
          fileReader.onerror = function (e) {
            file.$ngfDataUrl = '';
            rej(e)
          };
          fileReader.readAsDataURL(file);
        })
      } else {
        var url:any;
        try {
          url = URL.createObjectURL(file);
        } catch (e) {
          return Promise.reject(e);
        }
        
        deferred = deferred.then( ()=>url );
        file.$ngfBlobUrl = url;
      }
    } else {
      file[disallowObjectUrl ? '$ngfDataUrl' : '$ngfBlobUrl'] = '';
      return Promise.reject( new Error('Browser does not support window.FileReader, window.FileReader, or window.FileAPI') )//deferred.reject();
    }
  
    if (disallowObjectUrl) {
      p = file.$$ngfDataUrlPromise = deferred;
    } else {
      p = file.$$ngfBlobUrlPromise = deferred;
    }
  
    p = p.then((x:any)=>{
      delete file[disallowObjectUrl ? '$$ngfDataUrlPromise' : '$$ngfBlobUrlPromise'];
      return x
    })
  
    return p;
  }

}
