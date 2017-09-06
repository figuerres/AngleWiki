import { Component, OnInit } from '@angular/core';
import { MarkdownModule } from 'angular2-markdown';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { IWiki , IPage , ITag,IPageSummary  }  from '../types/Wiki-Interfaces';
import { WikiPagesService } from '../services/wiki-pages.service';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
   private wikiPagesService:  WikiPagesService
   ) { }

   public textData = '## Markdown content data';
   public Title = 'Markdown content data';

  ngOnInit( ) {

    let id = +this.route.snapshot.paramMap.get('id');
console.log(' pageId = ' , id);
    this.wikiPagesService.getWikiPage(id).subscribe(page =>{
      console.log(' page = ' ,page);
      console.log(' content = ' ,page.pageContent);
      this.textData = page.pageContent;
      this.Title = page.title;
    });

  }

}
