

import { Injectable} from '@angular/core';
import { HttpClient,   HttpResponse , HttpRequest, HttpHeaders , HttpParams, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { IWikiFile }  from '../types/Wiki-Interfaces';
import { IOData } from '../types/odata.interface'

@Injectable()
export class WikiFilesService {
 // public serviceBase : string =  'https://localhost:44305/wikiapi/'; //  'https://devwebservice.adldelivery.com/wikiapi/';
  public serviceBase : string = 'https://devwebservice.adldelivery.com/wikiapi/';
  

  constructor(
    private http: HttpClient
  ) { }

  public  UploadFiles(files:File[]) : Observable<HttpEvent<HttpRequest<FormData>>> {
    let url = this.serviceBase + 'assets';
    const formData:FormData = new FormData();
    for (let file of files) {
    //  console.log("file: ", file.name);
      formData.append('file', file, file.name );
    }

    const req = new HttpRequest<FormData>('POST', url, formData, {
      reportProgress: true, responseType: 'text'
    });
    return  this.http.request<HttpRequest<FormData>>( req);
  }

public GetFileList( )  : Observable<IWikiFile[]>{
 // https://devwebservice.adldelivery.com/wikiapi/Files?$select=id%2CfileName%2CmimeType%2CcreatedDate%2C&$orderby=createdDate%20desc

 let url = this.serviceBase + 'Files?$select=id%2CfileName%2CmimeType%2CcreatedDate%2C&$orderby=createdDate%20desc';
 return this.http.get(url) 
 .map(r => (r as IOData).value as IWikiFile[] );

}



  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
  
    console.error(error);
  
    return Observable.throw(error || 'Server error');
  }

}