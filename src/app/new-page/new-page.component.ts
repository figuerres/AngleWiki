import { Component, OnInit } from '@angular/core';
import { MarkdownModule } from 'angular2-markdown';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { IWiki , IPage , ITag,IPageSummary , IWikiName , IPageEdit }  from '../types/Wiki-Interfaces';
import { WikiPagesService } from '../services/wiki-pages.service';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {
  public textData = `## Markdown content data`;
  public wikiList: IWikiName[];

  public wikiPage:  IPageEdit  = {  
    "id": 0,
    "wikiId": 0,
    "parentPageId": null,
    "title": "",
    "pageContent": ""
  }

 public pagesList: IPageSummary[];


  constructor(
    private wikiPagesService:  WikiPagesService
    ) { }



  ngOnInit() {
 this.wikiPagesService.getWikiNameList().subscribe(w =>{
        console.log(' wiki = ' ,w);
       this.wikiList = w;
      });
  }

onWikiChange(event:Event){
  let wid = + (event.target as HTMLSelectElement).value;
  if(wid>0){
    this.wikiPagesService.getWikiPageList(wid).subscribe(pages => {
      this.pagesList = pages;
    });
  }
}




obSubmit(){

}

newPage(){
  this.wikiPage  = {  
    "id": 0,
    "wikiId": 0,
    "parentPageId": null,
    "title": "",
    "pageContent": ""
  };
}



}
