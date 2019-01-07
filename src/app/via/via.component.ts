import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkResolverService, Link } from '../link-resolver.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-via',
  templateUrl: './via.component.html',
  styleUrls: ['./via.component.scss']
})
export class ViaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private linkResolver: LinkResolverService, public snackBar: MatSnackBar) { }

  link: Link;

  ngOnInit() {
    this.fillLink();
  }

  copyUsername(username: string) {
    this.linkResolver.copyLink(username);
    this.openSnackBar('Data were COPIED', 'OK');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'
    });
  }

  getActionName() {
    let actionName = '';
    if (this.link.action) {
      this.link.actions.forEach(action => {
          if (action.type === this.link.action) {
            actionName = action.name;
          }
      })
    }
    return actionName;
  }

  fillLink() {
    const channel = this.route.snapshot.paramMap.get('channel');
    const username = this.route.snapshot.paramMap.get('username');
    const action = this.route.snapshot.paramMap.get('action');
    
    this.link = this.linkResolver.getLink(channel, username, action);       
  }

  openLink() {
    this.fillLink();
    const link = this.linkResolver.evalLink(this.link);
    window.open(link);
  }

}
