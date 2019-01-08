import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkResolverService, Link } from '../link-resolver.service';

@Component({
  selector: 'app-via',
  templateUrl: './via.component.html',
  styleUrls: ['./via.component.scss']
})
export class ViaComponent implements OnInit {

  link: Link;
  name: string;

  constructor(private route: ActivatedRoute, private linkResolver: LinkResolverService) { }


  ngOnInit() {
    let paramsHash = this.linkResolver.getParamsFromLocation();
    if (paramsHash['name']) {
      this.name = paramsHash['name'];
    }
    this.fillLink();
  }

  copyUsername(username: string) {
    this.linkResolver.copyLink(username);
    this.linkResolver.success('Data were COPIED');
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
