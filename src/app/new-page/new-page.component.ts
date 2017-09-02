import { Component, OnInit } from '@angular/core';
import { MarkdownModule } from 'angular2-markdown';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {
  public textData = `## Markdown content data`;
  constructor() { }

  ngOnInit() {
  }

}
