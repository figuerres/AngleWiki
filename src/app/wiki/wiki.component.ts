
import { Component, OnInit } from '@angular/core';
import { MarkdownModule } from 'angular2-markdown';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { IWiki , IPage , ITag,IPageSummary , IWikiName, INvp, INNvp }  from '../types/Wiki-Interfaces';
import { WikiPagesService } from '../services/wiki-pages.service';

import {Subscription} from 'rxjs';



@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
   private wikiPagesService:  WikiPagesService
   ) { }

   public linkList: any[];
   public pageTitle = '';
   public wiki: IWiki;
   public wikiList: INNvp[];
   public pageList: IPageSummary[];
 
  ngOnInit() {

    var wikiId : number;
    var hasParam : boolean = false;
    this.route.params.subscribe((params: Params) =>  wikiId = params['wikiId']  );
    hasParam = wikiId != undefined;
    if( hasParam){
      //
      // we have the wiki id, list the pages 
      //
      console.log(' has param = ' , wikiId);

     this.wikiPagesService.getWiki(wikiId).subscribe(w =>{
            console.log(' wiki = ' ,w);
            this.pageTitle = w.name;
            this.wiki = w;
              this.wikiPagesService.getWikiPageList(wikiId).subscribe(wPages =>{
                console.log(' wiki pages = ' ,wPages);
                this.pageList = wPages;
              });
          });
    }
    else{
      //
      // no id then list the wiki's that are avilible
      //
      console.log('no id get list ' );
       this.wikiPagesService.getWikiNameList().subscribe(w =>{
        console.log(' wiki = ' ,w);
       this.pageTitle = 'Wiki List';
       this.wikiList = w;
      });

    }

  }

}
