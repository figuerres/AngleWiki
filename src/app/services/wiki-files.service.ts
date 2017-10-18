

import { Injectable} from '@angular/core';
import { HttpClient,   HttpResponse , HttpRequest, HttpHeaders , HttpParams, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class WikiFilesService {
  public serviceBase : string = 'https://devwebservice.adldelivery.com/wikiapi/';
  constructor(
    private http: HttpClient
  ) { }

  public  UploadFiles(files:File[]) : Observable<HttpEvent<HttpRequest<FormData>>> {
    let url = this.serviceBase + 'assets';
    const formData:FormData = new FormData();
    for (let file of files) {
      console.log("file: ", file.name);
      formData.append('file', file, file.name );
    }

    const req = new HttpRequest<FormData>('POST', url, formData, {
      reportProgress: true, responseType: 'text'
    });
    return  this.http.request<HttpRequest<FormData>>( req);

    //  this.http.request().subscribe(e => {   e.})
    //return this.http.post( url, FormData,{reportProgress: true} )  ;
  }

  
  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
  
    console.error(error);
  
    return Observable.throw(error || 'Server error');
  }

}