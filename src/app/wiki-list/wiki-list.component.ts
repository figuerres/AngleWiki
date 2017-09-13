
import { Component, OnInit } from '@angular/core';
import { MarkdownModule } from 'angular2-markdown';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { IWiki , IPage , ITag,IPageSummary , IWikiName }  from '../types/Wiki-Interfaces';
import { WikiPagesService } from '../services/wiki-pages.service';

@Component({
  selector: 'app-wiki-list',
  templateUrl: './wiki-list.component.html',
  styleUrls: ['./wiki-list.component.css']
})
export class WikiListComponent implements OnInit {

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

  ngOnInit() {
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
