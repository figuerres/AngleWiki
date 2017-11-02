
import { Component, OnInit } from '@angular/core';
import { MarkdownModule } from 'angular2-markdown';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { IWiki , IPage , ITag,IPageSummary , IWikiName }  from '../types/Wiki-Interfaces';
import { WikiPagesService } from '../services/wiki-pages.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-wiki-toc',
  templateUrl: './wiki-toc.component.html',
  styleUrls: ['./wiki-toc.component.css']
})
export class WikiTocComponent implements OnInit {

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
   private wikiPagesService:  WikiPagesService
   ) { }

   public linkList: any[];
   public pageTitle = 'Markdown content data';
   public wiki: IWiki;
   public wikiList: IWikiName[];
   public pageList: IPageSummary[];
   busy: Subscription;

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

      this.busy=    this.wikiPagesService.getWiki(wikiId).subscribe(w =>{
            console.log(' wiki = ' ,w);
            this.pageTitle = w.title;
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
 

    }

  }

}
