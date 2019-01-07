import { Component, OnInit } from '@angular/core';
import { LinkResolverService, Link } from '../link-resolver.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private linkResolver: LinkResolverService, private sanitizer: DomSanitizer, public snackBar: MatSnackBar) { 
    this.links = linkResolver.links;
    let search = window.location.search.split(/\&|\?/gm);
    let paramsHash = {};
    search.forEach(term => {
      let parts = term.split('=');
      if (parts && parts.length > 1) {
        if (parts[0] === 'name') {
          this.name = decodeURIComponent(parts[1]);
        } else {
          paramsHash[parts[0]] = decodeURIComponent(parts[1]);
        }        
      }
    });

    this.links.forEach(link => {
      link.username = paramsHash[link.channel];
      link.link = this.linkResolver.evalLink(link);
      link.safeLink = this.sanitizer.bypassSecurityTrustUrl(this.linkResolver.evalLink(link));
    });

  }

  onChange(linkObj: Link) {
    linkObj.link = this.linkResolver.evalLink(linkObj);
  }

  copyLink(link: Link) {
    this.linkResolver.copyLink(link.link);
    this.openSnackBar('Link was COPIED', 'OK');
  }

  copyUsername(username) {
    this.linkResolver.copyLink(username);
    this.openSnackBar('Data were COPIED', 'OK');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'
    });
  }

  name: string;

  links: Array<Link>;

  ngOnInit() {
  }

}
