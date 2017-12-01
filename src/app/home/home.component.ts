import { Component, OnInit } from '@angular/core';
import { MarkdownModule } from 'angular2-markdown';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { IWiki , IPage , ITag,IPageSummary , IWikiName,INvp, INNvp }  from '../types/Wiki-Interfaces';

import {Subscription} from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router, 
    private route: ActivatedRoute
   ) { }

   public pageTitle = '';
   public wikiList: INNvp[];



   onListResolved( wList :  INNvp[] ){
    if(wList.length==1){
      this.router.navigate(['wiki/page/',  wList[0].id,  wList[0].linkName] );
    }else{
      this.pageTitle = 'Wiki List';
      this.wikiList = wList;
    }
  }



  ngOnInit() {

    this.route.data.subscribe(data => {
      this.onListResolved(data['wikiList']);
    });

  }
}
