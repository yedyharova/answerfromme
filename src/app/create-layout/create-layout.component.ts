import { Component, OnInit } from '@angular/core';
import { LinkResolverService, Link } from '../link-resolver.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'create-layout',
  templateUrl: './create-layout.component.html',
  styleUrls: ['./create-layout.component.scss']
})
export class CreateLayoutComponent implements OnInit {

  constructor(private linkResolver: LinkResolverService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.name = window.localStorage.getItem('name');
  }

  tryAllLink() {
    let link = this.createAllLinkFromStorage();
    if (link) {
      window.open(link);
    } else {
      this.openSnackBar('Data is EMPTY. Link was not COPIED.', 'OK');
    }
  }

  copyAllLink() {
    let link = this.createAllLinkFromStorage();
    let message = 'Data is EMPTY. Link was not COPIED.';
    if (link) {
      this.linkResolver.copyLink(link);
      message = 'Link was COPIED.'
    }
    this.openSnackBar(message, 'OK');
  }

  setName() {
    window.localStorage.setItem('name', this.name);
  }

  name: string;

  createAllLinkFromStorage():string {
    let links:Array<Link> = this.linkResolver.links;
    let secondPart = '';
    if (this.name) {
      secondPart += `name=${this.name}`;
    }
    links.forEach(link => {
      let storedData = window.localStorage.getItem(link.channel);
      if (storedData) {
        let storedObj = JSON.parse(storedData);
        if (storedObj.username) {
          if (secondPart.length) secondPart += '&';
          secondPart += `${link.channel}=${encodeURIComponent(storedObj.username)}`;
        }
      }
    });
    if (secondPart.length) {
      return `${window.location.protocol}//${window.location.host}/about?${secondPart}`;
    }
    return null;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'
    });
  }

}
