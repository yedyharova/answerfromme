import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  path: string;

  ngOnInit() {
    this.path = this.route.snapshot.routeConfig.path;
  }

}
