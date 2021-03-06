
import { Injectable, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import {IWiki , IPage , ITag,IPageSummary , IWikiName , IWikiToc  , IPageEdit,INvp, INNvp, IResolvedPage }  from '../types/Wiki-Interfaces';
import { IOData } from '../types/odata.interface'
import { WikiPagesService } from '../services/wiki-pages.service';

@Injectable()
export class WikiHomeNameListResolverService  implements Resolve<INvp[]>  {
    constructor(private wikiPagesService: WikiPagesService ) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INNvp[]> {
        return this.wikiPagesService.getWikiNameList();
    }
}
