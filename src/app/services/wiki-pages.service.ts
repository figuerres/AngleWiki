
import { Injectable, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {HttpClient  , HttpResponse , HttpRequest, HttpHeaders  } from '@angular/common/http';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { of } from 'rxjs/observable/of';

import {IWiki , IPage , ITag,IPageSummary , IWikiName , IWikiToc  , IPageEdit,INvp, INNvp }  from '../types/Wiki-Interfaces';
import { IOData } from '../types/odata.interface'
//import { AdlLoggerService } from '../shared/adl-logger.service';

import { AdlGlobalConfig } from '../shared/adl-global-config.service';
import { IDeploymentEnvironment } from   '../shared/iappconfig.interface';

@Injectable()
export class WikiPagesService {

  constructor( private http: HttpClient, private configService: AdlGlobalConfig  ) {
  }


  public  getWikiList(): Observable<IWiki[]> {
    let url = this.configService.Settings.odataApiUrl + 'Wikis';
    return this.http.get(url)
    .map(r =>  (r as IOData).value as IWiki[]);  
  }


  // Wikis?$select=id%2Ctitle&$orderby=title
  public  getWikiNameList(): Observable<INNvp[]> {
    let url = this.configService.Settings.apiUrl + 'Wiki/WikiList';
    return this.http.get<INNvp[]>(url);
   // .map(r => (r as IOData).value as IWikiName[]);
  }


  public  getPageNameBindingList(wikiId:number): Observable<INvp[]> {
    let url = this.configService.Settings.apiUrl + 'Wiki/WikiPageList/' + wikiId;
    return this.http.get<INvp[]>(url);
   // .map(r => (r as IOData).value as IWikiName[]);
  }
  
  public  getWikiNameBindingList(): Observable<INvp[]> {
    let url = this.configService.Settings.apiUrl + 'Wiki/WikiBindingList';
    return this.http.get<INvp[]>(url);
   // .map(r => (r as IOData).value as IWikiName[]);
  }
  
 
  public  getWiki(wikiId: number): Observable<IWiki> { 
    let url = this.configService.Settings.odataApiUrl  + 'Wikis(' + wikiId +')' ; 
    return this.http.get<IWiki>(url);
  }




  public  deleteWiki(wikiId: number): Observable<any> { 
    let url = this.configService.Settings.odataApiUrl  + 'Wiki(' + wikiId +')' ; 
    return this.http.delete(url);
  }


  public  addWiki(wiki: IWiki): Observable<IWiki> { 
    let postdata = {
        "name":wiki.name,
        "rolesJSON": wiki.rolesJSON
    };
    let url = this.configService.Settings.odataApiUrl  + 'Wikis' ; 
    return this.http.post<IWiki>(url, postdata);
  }


  public  getWikiPageList(wikiId: number): Observable<IPageSummary[]> {
    let url = this.configService.Settings.odataApiUrl  + 'Pages?$expand=wiki($select=title)&$filter=wikiId eq ' + wikiId +'&$select=wikiId,id,title&$orderby=title';
    return this.http.get(url).map(r => (r as IOData).value as IPageSummary[] );
  }


  public  getWikiTable(wikiId: number): Observable<IWikiToc> {
    let url = this.configService.Settings.apiUrl +'Wiki/WikiTable/' + wikiId ;
    return this.http.get<IWikiToc>(url);
    //.map(r => (r as IOData).value as IPageSummary[] );
  }

  public  getWikiTableByPage(pageId: number): Observable<IWikiToc> {
    let url = this.configService.Settings.apiUrl +'Wiki/WikiTableByPage/' + pageId ;
    return this.http.get<IWikiToc>(url);
    //.map(r => (r as IOData).value as IPageSummary[] );
  }

  

  // let url = 'https://devwebservice.adldelivery.com/api/Error/xThrow' ;
  //   return this.http.post(url,'')
  //   .map(response => response.json() as IPage)
  //   .catch(error => this.handleError(error,url) );

  public  getWikiToc(WikiId: number): Observable<IWikiToc> {
    let url = this.configService.Settings.apiUrl  + 'toc/WikiToc/' + WikiId +'' ;
    return this.http.get<IWikiToc>(url);
  }

  public  getWikiPage(pageId: number): Observable<IPage> {
    if (pageId === 0) {
      return of(this.newWikiPage());
    }
    let url = this.configService.Settings.apiUrl + 'Wiki/WikiPage/' + pageId  ;
    return this.http.get<IPage>(url);
  }


  private newWikiPage():IPage {
   return {  
      "id": 0,
      "wikiId": 0,
      "parentPageId": null,
      "name": "",
      "pageContent": "",
      "pageContentHtml": "",
      "createdBy": 0,
      "createdDate": null,
      "whoChanged":0,
      "lastChanged": null,
      "rowVersion": null,
      "recDelete": false,
      "order":0,
      "rolesJSON": null
    };
  }



  public addWikiPage( page:IPage ): Observable<IPage>   {
    let url = this.configService.Settings.odataApiUrl  + 'Pages' ;
    let postdata = {
      "wikiId": +page.wikiId,
      "parentPageId": page.parentPageId,
        "name":page.name    ,
        "pageContent":  page.pageContent,
        "pageContentHtml":  page.pageContentHtml,
        "order":page.order,
        "rolesJSON": page.rolesJSON
    };
    console.log("add page = " , url  );
    return this.http.post<IPage>(url, postdata);
  }

  public updateWikiPage( page:IPage ): Observable<any>   {
    let url = this.configService.Settings.odataApiUrl  + 'Pages(' + page.id  + ')' ;
    console.log(" update page = " , url  );
    return this.http.patch(url, page);
  }

  public deleteWikiPage(pageid:number): Observable<any>  {
    let url = this.configService.Settings.odataApiUrl  + 'Pages(' +pageid+')' ;
    return this.http.delete(url);
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