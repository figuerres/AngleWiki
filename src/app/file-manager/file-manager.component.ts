import { Component, OnInit } from '@angular/core';

import { HttpClient,   HttpResponse , HttpRequest, HttpHeaders , HttpParams, HttpEventType,HttpProgressEvent  } from '@angular/common/http';

import { ngfSelect,   ngfBackground,  } from '../shared/ngf'

import { WikiFilesService } from '../services/wiki-files.service';


   const uploadURL = 'https://devwebservice.adldelivery.com/wikiapi/assets/';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})


//
// missing needed functions: check files to upload for duplicate names on server
// file rename
// file delete
// file size , file type, who uploaded file
//
// linking the file to the wiki
//
// image src or href use filename or id ??  use service url or server folder name ?
//
//

export class FileManagerComponent implements OnInit {

  public files:Array<File> = new Array<File>();

 public uploadProgress: number = 0;

  constructor( private FilesService :WikiFilesService ) { 
  }

  ngOnInit() {
  }


  public filesChange(e: any){
    console.log("filesChange: ", e);
    let  filesList:Array<File> =  e as  Array<File>;
    
    for (let file of filesList) {
      this.files.push(file);
    }

  }

public uploadAll(){

  this.FilesService.UploadFiles(  this.files ).subscribe(event  =>{
    if (event.type === HttpEventType.DownloadProgress) {
      console.log("Download progress event", event);
    }
    if (event.type === HttpEventType.UploadProgress) {
      console.log("Upload progress event", event);
      // This is an upload progress event. Compute and show the % done:
    // const percentDone = Math.round(100 * event.loaded / event.total);
    this.uploadProgress = Math.round(100 * event.loaded / event.total);
    console.log(`File is ${this.uploadProgress}% uploaded.`);

    }
    if (event.type === HttpEventType.Response) {
      console.log("response received...", event.body);
    }

    if (event instanceof HttpResponse) {
      this.uploadProgress = 0;
      console.log('File is completely uploaded!');
    }


  });
}


public cancelAll(){
  this.files = new Array<File>();
}

public clearQueue(){
 this.files = new Array<File>();
}

  public onUploadDone(e: any){
    console.log("onUploadDone: ", e);
  }
  
  public onUploaded(e: any){
    console.log("onUploaded: ", e);
  }
  
  public onUploadError(e: any){
    console.log("onUploadError: ", e);
  }
  

}
