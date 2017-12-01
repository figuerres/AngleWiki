
import { Component, OnInit } from '@angular/core';
import { MarkdownModule } from 'angular2-markdown';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { IWiki , IPage , ITag,IPageSummary , IWikiName,INvp,INNvp }  from '../types/Wiki-Interfaces';
import { WikiPagesService } from '../services/wiki-pages.service';
import {Subscription} from 'rxjs';

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
   public pageTitle = '';
   public wikiList: INNvp[];
  
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
