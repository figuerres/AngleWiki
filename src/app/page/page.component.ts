import { Component, OnInit } from '@angular/core';
import { MarkdownComponent, MarkdownService } from 'angular2-markdown';
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

   public textData = '## Markdown content data';
   public Title = 'Markdown content data';
   public pageList: IPageSummary[];

  constructor( private router: Router,  private route: ActivatedRoute, private mark : MarkdownService, private wikiPagesService:  WikiPagesService) {

    //
   // <a [routerLink]="['${href}']" routerLinkActive="active">${text}</a>
   //
   //

    this.mark.renderer.link = (href: string,  title: string,  text: string) => {
      if( href.startsWith("~")){
        let u_str = href.replace("~","");
      return `<a _ngcontent-c4="" routerlinkactive="active" ng-reflect-router-link="${u_str}" ng-reflect-router-link-active="active" href="${u_str}">${text}</a>`;
    }else{
      return `<a  href="${href}">${text}</a>`;      
    }
     // return `<a [routerLink]="['${href}']" routerLinkActive="active">${text}</a>`;
    // return `<p><hr><br>${href} <br>${title}<br>${text}<br><hr></p>`;

    };


  }

  ngOnInit( ) {


//console.log("route param map ",  this.route.snapshot.paramMap );
    //let id = +this.route.snapshot.paramMap.get('id');
//console.log(' pageId = ' , id);

    this.route.params.forEach(params =>{
      let id = params["id"];
      this.wikiPagesService.getWikiPage(id).subscribe(page =>{
        console.log(' page = ' ,page);
        console.log(' content = ' ,page.pageContent);
        this.textData = page.pageContent;
        this.Title = page.title;
      this.wikiPagesService.getWikiPageList(page.wikiId).subscribe(wPages =>{
          console.log(' wiki pages = ' ,wPages);
          this.pageList = wPages;
        });
      });
    });


  }

}
