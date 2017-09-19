
import { Injectable, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import {IWiki , IPage , ITag,IPageSummary , IWikiName , IWikiToc }  from '../types/Wiki-Interfaces';

@Injectable()
export class WikiPagesService {

   public serviceBase : string = 'https://devwebservice.adldelivery.com/wikiapi/';
 // public serviceBase : string = 'https://localhost:44305/wikiapi/';

  constructor(
    private http: Http
  ) { }

  public  getWikiList(): Observable<IWiki[]> {
    let url = this.serviceBase + 'Wikis';
      return this.http.get(url)
      .map(response => response.json().value as IWiki[])
      .catch(this.handleError);
}

// Wikis?$select=id%2Ctitle&$orderby=title
public  getWikiNameList(): Observable<IWikiName[]> {
  let url = this.serviceBase + 'Wikis?$select=id,title&$orderby=title';
    return this.http.get(url)
    .map(response => response.json().value as IWikiName[])
    .catch(this.handleError);
}

public  getWiki(wikiId: number): Observable<IWiki> { 
      let url = this.serviceBase + 'Wikis(' + wikiId +')' ; 
        return this.http.get(url) 
        .map(response => response.json() as IWiki)
        .catch(this.handleError);
  }

  public  getWikiPageList(wikiId: number): Observable<IPageSummary[]> {
        let url = this.serviceBase + 'Pages?$expand=wiki($select=title)&$filter=wikiId eq ' + wikiId +'&$select=wikiId,id,title&$orderby=title';
          return this.http.get(url)
          .map(response => response.json().value as IPageSummary[])
          .catch(this.handleError);
    }

  public  getWikiPage(pageId: number): Observable<IPage> {
        let url = this.serviceBase + '/Pages(' + pageId +')' ;
          return this.http.get(url)
          .map(response => response.json() as IPage)
          .catch(this.handleError);
    }

    public  getWikiToc(WikiId: number): Observable<IWikiToc> {
      let url = this.serviceBase + '/toc/WikiToc/' + WikiId +'' ;
        return this.http.get(url)
        .do(x=>{
          console.log( " response = ", x);
         } )
        .map(response => response.json() as IWikiToc)
        .catch(this.handleError);
  }


private handleError(error: Response) {
  // in a real world app, we may send the server to some remote logging infrastructure
  // instead of just logging it to the console

  console.error(error);

  return Observable.throw(error.json().error || 'Server error');
}

}