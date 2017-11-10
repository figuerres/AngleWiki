import { Component, OnInit , OnDestroy} from '@angular/core';

import { HttpClient,   HttpResponse , HttpRequest, HttpHeaders , HttpParams, HttpEventType,HttpProgressEvent  } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ISubscription} from 'rxjs/Subscription'

import {Subscription} from 'rxjs';

import { ngfSelect,   ngfBackground  } from '../shared/ngf'

import { WikiFilesService } from '../services/wiki-files.service';
import {IWiki , IPage , ITag,IPageSummary , IWikiName , IWikiToc, IWikiFile, INvp }  from '../types/Wiki-Interfaces';

import { User } from 'oidc-client';

import { WikiPagesService } from '../services/wiki-pages.service';
import { AdlGlobalUser   } from '../shared/adl-global-user.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})


export class FileManagerComponent implements OnInit , OnDestroy{
  public files:Array<File> = new Array<File>();
  public uploadProgress: number = 0;
  public WikiFiles: IWikiFile[] ;
  private userLoggedInSubscription : ISubscription;
  private userSubscription : ISubscription;
  public wikiList: INvp[];
  private currentWikiId: number = 0;
  busy: Subscription;

  private user: User;

  constructor(
     private router: Router, 
     private FilesService :WikiFilesService ,
     private wikiPagesService:  WikiPagesService,
     private AdlUser: AdlGlobalUser) { 
  }

  ngOnInit() {

    this.userLoggedInSubscription  =  this.AdlUser.loggedIn.subscribe(loggedin => {
      console.log(" logged in ? ", loggedin);
      if(!loggedin){
        this.router.navigate(['/']);
      }
    });

    this.userSubscription = this.AdlUser.user.subscribe( u => {
      console.log("user is : ", u);
      this.user = u;
    });

    this.busy=    this.wikiPagesService.getWikiNameBindingList().subscribe(w =>{
      console.log(' wiki = ' ,w);
     this.wikiList = w;
    });

  }

  onWikiChange(event:Event){
    let wid = + (event.target as HTMLSelectElement).value;
    if(wid>0){
      this.currentWikiId = wid;
      this.busy=   this.FilesService.GetFileList(this.currentWikiId).subscribe (data => {
        this.WikiFiles = data;
      });
    }
    else{
      this.currentWikiId = 0;
      this.WikiFiles = null;
    }
  }
  



  ngOnDestroy() {
    this.userLoggedInSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  public filesChange(e: any){
    let  filesList:Array<File> =  e as  Array<File>;
    for (let file of filesList) {
      this.files.push(file);
    }
  }

  public uploadAll(){
    this.FilesService.UploadFiles( this.files , this.currentWikiId ).subscribe(event  =>{
      if (event.type === HttpEventType.UploadProgress) {
        console.log("Upload progress event", event);
        // This is an upload progress event. Compute and show the % done:
        // const percentDone = Math.round(100 * event.loaded / event.total);
        this.uploadProgress = Math.round(100 * event.loaded / event.total);
        console.log(`File(s) are ${this.uploadProgress}% uploaded.`);
      }
      if (event.type === HttpEventType.Response) {
        let r = event as HttpResponse<HttpRequest<FormData>>;
        if (r.ok){
          this.uploadProgress = 0;
          this.files = new Array<File>();
          console.log('File(s) are completely uploaded!');
          this.busy=   this.FilesService.GetFileList(this.currentWikiId).subscribe (data => {
            this.WikiFiles = data;
            });          
        } else {
          console.log("Error? ", r );
        }  
      }
    });
  }

  public cancelAll(){
    this.files = new Array<File>();
  }
  
  public clearQueue(){
   this.files = new Array<File>();
  }

}
