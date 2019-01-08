import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  pathName: string;

  constructor() { }

  ngOnInit() {
    this.pathName = window.location.pathname;
  }

}
