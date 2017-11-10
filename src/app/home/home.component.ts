import { Component, OnInit } from '@angular/core';
import { MarkdownModule } from 'angular2-markdown';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { IWiki , IPage , ITag,IPageSummary , IWikiName,INvp, INNvp }  from '../types/Wiki-Interfaces';
import { WikiPagesService } from '../services/wiki-pages.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
   private wikiPagesService:  WikiPagesService
   ) { }

   public pageTitle = '';
   public wikiList: INNvp[];
   busy: Subscription;

  ngOnInit() {
      this.busy=  this.wikiPagesService.getWikiNameList().subscribe(w =>{
        if( w.length==1){
           this.router.navigate(['wiki/page/', w[0].id, w[0].linkName] );
         }else{
           this.pageTitle = 'Wiki List';
           this.wikiList = w;
         }
      });
  }
}
