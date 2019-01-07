import { Component, OnInit } from '@angular/core';
import { LinkResolverService, Link } from '../link-resolver.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'create-links',
  templateUrl: './create-links.component.html',
  styleUrls: ['./create-links.component.scss']
})
export class CreateLinksComponent implements OnInit {

  constructor(private linkResolver: LinkResolverService, public snackBar: MatSnackBar) { 
    this.links = linkResolver.links;
  }

  links: Array<Link>;

  setLocalStrorage():void {
    this.links.forEach(link => {
      window.localStorage.setItem(link.channel, JSON.stringify({ username: link.username, action: link.action }));
    });
  }

  createLink(linkObj: Link):void {
    linkObj.link =  `${window.location.protocol}//${window.location.host}/via/${linkObj.channel}/${linkObj.username}/${linkObj.action || ''}`;
  }

  onChange(linkObj: Link):void {
    this.setLocalStrorage();
    this.createLink(linkObj);
  }

  copyLink(linkObj: Link) {
    this.linkResolver.copyLink(linkObj.link);
    this.openSnackBar(`${linkObj.type} link was COPIED.`, 'OK');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'
    });
  }

  ngOnInit() {
    this.links.forEach(link => {
      let linkInfo = window.localStorage.getItem(link.channel);
      if (linkInfo) {
        let temp = JSON.parse(linkInfo);
        if (temp.action) {
          link.action = temp.action;
        }
        if (temp.username) {
          link.username = temp.username;
          this.createLink(link);
        }
      }
    });
  }

}
