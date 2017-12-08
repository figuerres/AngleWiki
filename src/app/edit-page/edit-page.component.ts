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

import { HtmlOutlet } from '../shared/adl-html-outlet.directive';
import { Ckedit5 } from '../shared/ckedit/ckedit5.directive';

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

  private entryPageId: number;
  public value: string;

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
          return `<a routerLink="${u_str}" >${text}</a>`;
      }else{
        return `<a href="${href}">${text}</a>`;      
      }
      };
     }

     
  onPageResolved( wPage : IPage ,  wNameList: INvp[]
   ){
    this.page = wPage;
    this.entryPageId = this.page.id;
    this.wikiList =  wNameList;

    this.value = this.mark.compile( this.page.pageContent);

    if (this.page.id != 0){
      this.wikiPagesService.getPageNameBindingList(this.page.wikiId).subscribe(wPages =>{
        console.log(' wiki pages = ' ,wPages);
        this.pagesList  = wPages;
      });
    }

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

    this.route.data.subscribe(data => {
      this.onPageResolved(data['page'],data['nameList'] );
    });

  }

  markdownChange( event:Event ){
    this.value = this.mark.compile( this.page.pageContent);
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
      "pageContentHtml": "",
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
