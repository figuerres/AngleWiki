import { Component, OnInit } from '@angular/core';
//import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';

import { ngfModule, ngfUploader, ngf } from "angular-file"


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


  constructor() { 
  }

  ngOnInit() {
  }

  public UploadAll(){
    this.uploader.uploadFiles( this.ngfOb.files );
  }


public onUploadDone(e: any){

}

public onUploaded(e: any){

}

public onUploadError(e: any){

}



  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }


  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }







}
