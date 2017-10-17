
import { Injectable, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {HttpClient  , HttpResponse , HttpRequest, HttpHeaders  } from '@angular/common/http';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import {IWiki , IPage , ITag,IPageSummary , IWikiName , IWikiToc }  from '../types/Wiki-Interfaces';
import { IOData } from '../types/odata.interface'
//import { AdlLoggerService } from '../shared/adl-logger.service';


@Injectable()
export class WikiPagesService {

   public serviceBase : string = 'https://devwebservice.adldelivery.com/wikiapi/';
   //public serviceBase : string = 'https://localhost:44305/wikiapi/';

  constructor( private http: HttpClient ) {
  }

  public  getWikiList(): Observable<IWiki[]> {
    let url = this.serviceBase + 'Wikis';
    return this.http.get(url)
    .map(r =>  (r as IOData).value as IWiki[]);  
  }

  // Wikis?$select=id%2Ctitle&$orderby=title
  public  getWikiNameList(): Observable<IWikiName[]> {
    let url = this.serviceBase + 'Wikis?$select=id,title&$orderby=title';
    return this.http.get(url) 
    .map(r => (r as IOData).value as IWikiName[] );
  }

  public  getWiki(wikiId: number): Observable<IWiki> { 
    let url = this.serviceBase + 'Wikis(' + wikiId +')' ; 
    return this.http.get<IWiki>(url);
  }

  public  getWikiPageList(wikiId: number): Observable<IPageSummary[]> {
    let url = this.serviceBase + 'Pages?$expand=wiki($select=title)&$filter=wikiId eq ' + wikiId +'&$select=wikiId,id,title&$orderby=title';
    return this.http.get(url).map(r => (r as IOData).value as IPageSummary[] );
  }

  // let url = 'https://devwebservice.adldelivery.com/api/Error/xThrow' ;
  //   return this.http.post(url,'')
  //   .map(response => response.json() as IPage)
  //   .catch(error => this.handleError(error,url) );

  public  getWikiPage(pageId: number): Observable<IPage> {
    let url = this.serviceBase + '/Pages(' + pageId +')' ;
    return this.http.get<IPage>(url);
  }

  public  getWikiToc(WikiId: number): Observable<IWikiToc> {
    let url = this.serviceBase + '/toc/WikiToc/' + WikiId +'' ;
    return this.http.get<IWikiToc>(url);
  }

  private handleError(error: Response, url:string) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    //
    console.error(error);
    //
    //console.log("this.logger : ", this.logger);
    //console.log("this.logger.log : ", this.logger.log);
    //
    //
    //  this.logger.log.error("wiki page service", url  , error);
    return Observable.throw(error || 'Server error');
  }
}