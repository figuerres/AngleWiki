import { Component, OnInit } from '@angular/core';

//import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';
//import { ngfModule , ngfDrop,   ngfSelect,   ngfBackground,   ngfUploader,   ngf } from '../shared/ngf/ngf.module'

import { ngfDrop,   ngfSelect,   ngfBackground,   ngfUploader,   ngf } from '../shared/ngf'


//import { ngfModule  } from '../shared/ngf/ngf.module'
//   const uploadURL = 'https://devwebservice.adldelivery.com/wikiapi/fileupload/';
// const uploadURL =     'https://localhost:44305/wikiapi/assets/'

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

  // public uploader: FileUploader = new FileUploader({url: uploadURL});
  public uploader: ngfUploader ;

  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  public ngfOb : ngf;

  files:File[];
  file:File;


  constructor() { 
  }

  ngOnInit() {
  }


  public filesChange(e: any){
    console.log("filesChange: ", e);
    let  filesList:Array<File> =  e as  Array<File>;
    for (let file of filesList) {
      console.log("file :",file.name);
    }
  }

  public UploadAll(){

    console.log("UploadAll: "  );
    console.log("  this.ngfOb : ", this.ngfOb );
    console.log("  this.ngfOb.files : ", this.ngfOb.files  );

    this.uploader.uploadFiles( this.ngfOb.files );
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
  
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  
  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }


}
