
import { Component, OnInit , OnDestroy } from '@angular/core';
import { MarkdownComponent, MarkdownService } from 'angular2-markdown';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription'
import { Subscription } from 'rxjs';

import { IWiki , IPage , ITag,IPageSummary, IWikiToc  }  from '../types/Wiki-Interfaces';
import { WikiPagesService } from '../services/wiki-pages.service';
import { AdlGlobalUser   } from '../shared/adl-global-user.service';
import { User } from 'oidc-client';

import { HtmlOutlet } from '../shared/adl-html-outlet.directive';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

   public pageList: IPageSummary[];

   public page : IPage;
   private userLoggedInSubscription : ISubscription;
   private userSubscription : ISubscription;
   private user: User;
 
   public wikiToc: IWikiToc = {
    id: 0,
  order: 0,
    name: "empty",
    children: [ ]
   };

   public value: string;

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
        //
        //   <a [routerLink]="['/']"              routerLinkActive="active">Home</a> 
        //
        return `<a routerLink="${u_str}" >${text}</a>`;
      }else{
        return `<a href="${href}">${text}</a>`;      
      }
    };
  }

  onPageResolved( wPage : IPage ,  wWikiToc: IWikiToc ){
    this.page = wPage;
    this.wikiToc =  wWikiToc;
    this.nodes = this.wikiToc.children;

    this.value = this.mark.compile( this.page.pageContent);

    // this.page.pageContentHtml =  this.mark.compile( this.page.pageContent);
    // console.log("page html: ",this.page.pageContentHtml);
    // this. wikiPagesService.updateWikiPage(this.page).subscribe(p=>{
    //   console.log("page updated: ",this.page);
    // });
  }

  ngOnInit( ) {

    this.userSubscription = this.AdlUser.user.subscribe( u => {
      console.log("user is : ", u);
      this.user = u;
    });

    this.route.data.subscribe(data => {
      this.onPageResolved(data['page'],data['toc']);
    });

  }

  editPage(){
    this.router.navigate(['/wikipage/edit/' ,  this.page.id,  this.page.name  ]  );
  }

  ngOnDestroy() {
    
    this.userSubscription.unsubscribe();
  }


}
