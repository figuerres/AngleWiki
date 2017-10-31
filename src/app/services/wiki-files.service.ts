

import { Injectable} from '@angular/core';
import { HttpClient,   HttpResponse , HttpRequest, HttpHeaders , HttpParams, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { IWikiFile }  from '../types/Wiki-Interfaces';
import { IOData } from '../types/odata.interface'


import { AdlGlobalConfig } from '../shared/adl-global-config.service';
import { IDeploymentEnvironment } from   '../shared/iappconfig.interface';

@Injectable()
export class WikiFilesService {

  constructor(
    private http: HttpClient,  private configService: AdlGlobalConfig 
  ) { }

  public  UploadFiles(files:File[], wikiId: number ) : Observable<HttpEvent<HttpRequest<FormData>>> {
    let url = this.configService.Settings.fileApiUrl ;
    const formData:FormData = new FormData();
    formData.append("wikiId", wikiId.toString() );
    for (let file of files) {
    //  console.log("file: ", file.name);
      formData.append('file', file, file.name );
    }

    const req = new HttpRequest<FormData>('POST', url, formData, {
      reportProgress: true, responseType: 'text'
    });
    return  this.http.request<HttpRequest<FormData>>( req);
  }

public GetFileList(wikiId: number)  : Observable<IWikiFile[]>{
  //
  //  $filter=wikiId%20%20eq%201
 //  https://devwebservice.adldelivery.com/wikiapi/Files?$select=id%2CfileName%2CmimeType%2CcreatedDate%2C&$orderby=createdDate%20desc
 //
 //  https://localhost:44309/wikiapi/Files?$filter=wikiId%20%20eq%201&$select=id%2CfileName%2CmimeType%2CcreatedDate&$orderby=createdDate%20desc
 //

 let url = this.configService.Settings.odataApiUrl + 'Files?$filter=wikiId eq ' + wikiId + '&$select=id,wikiId,fileName,mimeType,createdDate&$orderby=createdDate desc';
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