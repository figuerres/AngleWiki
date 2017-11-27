import { Component, OnInit , OnDestroy} from '@angular/core';
import { MarkdownComponent, MarkdownService } from 'angular2-markdown';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ISubscription} from 'rxjs/Subscription'
import {Subscription} from 'rxjs';

import { IWiki , IPage , ITag,IPageSummary, IWikiToc  }  from '../types/Wiki-Interfaces';
import { WikiPagesService } from '../services/wiki-pages.service';
import { AdlGlobalUser   } from '../shared/adl-global-user.service';
import { User } from 'oidc-client';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

   //public textData = '## Markdown content data';
   //public Title = 'Markdown content data';
   public pageList: IPageSummary[];

   public page : IPage;
   private userLoggedInSubscription : ISubscription;
   private userSubscription : ISubscription;
   private user: User;
   busy: Subscription;
   public wikiToc: IWikiToc = {
    id: 0,
  order: 0,
    name: "empty",
    children: [ ]
   };

   public nodes = [{}];


  constructor( 
    private router: Router,  
    private route: ActivatedRoute, 
    private mark : MarkdownService,
    private wikiPagesService:  WikiPagesService,
    private AdlUser: AdlGlobalUser
  ) {

    this.mark.renderer.link = (href: string,  title: string,  text: string) => {
      if( href.startsWith("~")){
        let u_str = href.replace("~","");
      return `<a _ngcontent-c4="" routerlinkactive="active" ng-reflect-router-link="${u_str}" ng-reflect-router-link-active="active" href="${u_str}">${text}</a>`;
    }else{
      return `<a href="${href}">${text}</a>`;      
    }
    };


  }

  ngOnInit( ) {

    this.userSubscription = this.AdlUser.user.subscribe( u => {
      console.log("user is : ", u);
      this.user = u;
    });

      this.route.params.forEach(params =>{
      let id = params["id"];
      this.busy=  this.wikiPagesService.getWikiPage(id).subscribe(page =>{
      //  console.log(' page = ' ,page);
      //  console.log(' content = ' ,page.pageContent);
        this.page = page;
        this.wikiPagesService.getWikiTable(page.wikiId).subscribe(wToc =>{
        //  console.log(' wiki Toc = ' ,wToc);
          this.wikiToc = wToc;
          this.nodes = this.wikiToc.children;
        });
      });
    });
  }

  editPage(){
    this.router.navigate(['/wikipage/edit/' ,  this.page.id,  this.page.name  ]  );
  }

  ngOnDestroy() {
    
    this.userSubscription.unsubscribe();
  }


}
