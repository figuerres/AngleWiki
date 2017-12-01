
import { Component, OnInit } from '@angular/core';

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
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public wikiList: INvp[];

  private userLoggedInSubscription : ISubscription;
  private userSubscription : ISubscription;
 
  public pagesList: INvp[];
  private user: User;

  private entryPageId: number;

private wiki : IWiki ;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private mark : MarkdownService, 
    private wikiPagesService:  WikiPagesService,
    private AdlUser: AdlGlobalUser

  ) { 

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

   this.wikiPagesService.getWikiNameBindingList().subscribe(w =>{
      console.log(' wiki = ' ,w);
     this.wikiList = w;
     this.newWiki();
    });
  }

  newWiki(){
    this.wiki  = {  
      "id": 0,
      "name": "",
      "createdBy": 0,
      "createdDate": null,
      "whoChanged":0,
      "lastChanged": null,
      "rowVersion": null,
      "recDelete": false,
      "rolesJSON": null
    };
  }

  onSubmit(){
     this. wikiPagesService.addWiki(this.wiki).subscribe(p=>{
        this.wikiPagesService.getWikiNameBindingList().subscribe(w =>{
        console.log(' wiki = ' ,w);
       this.wikiList = w;
       this.newWiki();
      });
    });
}
}
