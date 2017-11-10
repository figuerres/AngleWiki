import { Component, OnInit , OnDestroy} from '@angular/core';
import { MarkdownModule } from 'angular2-markdown';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ISubscription} from 'rxjs/Subscription'
import {Subscription} from 'rxjs';

import { MarkdownComponent, MarkdownService } from 'angular2-markdown';

import { IWiki , IPage , ITag,IPageSummary , IWikiName , IPageEdit, INvp, INNvp }  from '../types/Wiki-Interfaces';
import { WikiPagesService } from '../services/wiki-pages.service';
import { AdlGlobalUser   } from '../shared/adl-global-user.service';
import { User } from 'oidc-client';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  public wikiList: INvp[];
  private userLoggedInSubscription : ISubscription;
  private userSubscription : ISubscription;
  public page : IPage;
  public pagesList: INvp[];
  private user: User;
  busy: Subscription;
  private entryPageId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private mark : MarkdownService, 
    private wikiPagesService:  WikiPagesService,
    private AdlUser: AdlGlobalUser
    ) {
      this.mark.renderer.link = (href: string,  title: string,  text: string) => {
        if( href.startsWith("~")){
          let u_str = href.replace("~","");
        return `<a _ngcontent-c4="" routerlinkactive="active" ng-reflect-router-link="${u_str}" ng-reflect-router-link-active="active" href="${u_str}">${text}</a>`;
      }else{
        return `<a href="${href}">${text}</a>`;      
      }
      };
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
    this.route.params.subscribe(p => {
      if (p['id']) {
        let id = +p["id"];
        this.entryPageId = id;
        this.busy=    this.wikiPagesService.getWikiPage(id).subscribe(p =>{
          this.page = p;
          console.log(' page = ' ,this.page);
          console.log(' content = ' ,this.page.pageContent);
          this.wikiPagesService.getPageNameBindingList(this.page.wikiId).subscribe(wPages =>{
            console.log(' wiki pages = ' ,wPages);
            this.pagesList  = wPages;
          });
          this.wikiPagesService.getWikiNameBindingList().subscribe(w =>{
            console.log(' wiki = ' ,w);
            this.wikiList = w;
          });
        });    
      } else {
        this.busy=   this.wikiPagesService.getWikiNameBindingList().subscribe(w =>{
          this.newPage();
          console.log(' wiki = ' ,w);
          this.wikiList = w;
        });
      }
    });
 
  }

  onWikiChange(event:Event){
    let wid = + (event.target as HTMLSelectElement).value;
    if(wid>0){
      this.wikiPagesService.getPageNameBindingList(wid).subscribe(pages => {
        this.pagesList = pages;
      });
    }
  }

  onSubmit(){

    console.log("this.entryPageId = " , this.entryPageId  );

    if( !this.entryPageId ){
      this. wikiPagesService.addWikiPage(this.page).subscribe(p=>{
        this.page = p;
        console.log("new page saved: ",this.page);
        this.newPage();
      });
    }else{
      this. wikiPagesService.updateWikiPage(this.page).subscribe(p=>{
        console.log("page updated: ",this.page);
        this.router.navigate(['/wiki/page/', this.page.id,  this.page.name ] );
      });
    }
  }

  newPage(){
    this.page  = {  
      "id": 0,
      "wikiId": 0,
      "parentPageId": null,
      "name": "",
      "pageContent": "",
      "createdBy": 0,
      "createdDate": null,
      "whoChanged":0,
      "lastChanged": null,
      "rowVersion": null,
      "recDelete": false,
      "order":0,
      "rolesJSON": null
    };
  }

  ngOnDestroy() {
    this.userLoggedInSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
