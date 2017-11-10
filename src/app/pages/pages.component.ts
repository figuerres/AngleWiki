

import { Component, OnInit } from '@angular/core';
import { MarkdownModule } from 'angular2-markdown';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

//import { TreeModule } from 'angular-tree-component';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { IWiki , IPage , ITag,IPageSummary , IWikiName, IWikiToc }  from '../types/Wiki-Interfaces';
import { WikiPagesService } from '../services/wiki-pages.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
   private wikiPagesService:  WikiPagesService
   ) { }

   public linkList: any[];
   public pageTitle = '';
   public wiki: IWiki;
   public wikiList: IWikiName[];
   public pageList: IPageSummary[];
   public wikiToc: IWikiToc = {
    id: 0,
  order: 0,
    name: "empty",
    children: [ ]
   };

  //  customTemplateStringOptions = {
  //   // displayField: 'subTitle',
  //   isExpandedField: 'expanded',
  //   idField: 'uuid',
  //   getChildren: this.getChildren.bind(this),
  //   actionMapping,
  //   nodeHeight: 23,
  //   allowDrag: true,
  //   useVirtualScroll: true
  // }

   customTemplateStringOptions = {
    allowDrag: true,
    useVirtualScroll: true
  }


  public nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    },
    {
      id: 8,
      name: 'root3',
      children: [
        { id: 9, name: 'child3.1' },
        {
          id: 10,
          name: 'child3.2',
          children: [
            { id: 11, name: 'subsub' }
          ]
        }
      ]
    }
  ];

/*
                <ol>
                  <li *ngFor="let item of pageList; let i = index " >
                    <a [routerLink]="['/wiki/page'+'/'+item.id+'/'+item.title+'']" 
                     routerLinkActive="active" >{{item.title}}</a></li>
              </ol>
            <div *ngIf='pageList' class="list-group">
               <a *ngFor="let item of pageList; let i = index " 
                [routerLink]="['/wiki/page'+'/'+item.id+'/'+item.title+'']" 
                routerLinkActive="active" class="list-group-item">{{item.title}}</a>
            </div>

*/

  ngOnInit() {

    var wikiId : number;
    var hasParam : boolean = false;
    this.route.params.subscribe((params: Params) =>  wikiId = params['wikiId']  );
    hasParam = wikiId != undefined;
    if( hasParam){
      //
      // we have the wiki id, list the pages 
      //
      console.log(' has param = ' , wikiId);
      this.wikiPagesService.getWikiToc(wikiId).subscribe(wToc =>{
        console.log(' wiki pages = ' ,wToc);
        this.wikiToc = wToc;
        console.log(' this.wikiToc = ' ,this.wikiToc);
        this.nodes = this.wikiToc.children;
      });
    }
    else{
      //
      // no id then list the wiki's that are avilible
      //
      console.log('no id get list ' );
    }
  }
}
