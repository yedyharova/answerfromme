import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkResolverService } from '../link-resolver.service';

@Component({
  selector: 'site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {

  constructor(private route: ActivatedRoute, private linkResolver: LinkResolverService) { }

  path: string;
  aboutHistory: Array<any>;

  ngOnInit() {
    this.path = this.route.snapshot.routeConfig.path;
    this.aboutHistory = this.linkResolver.getAboutHistory();
  }

  getPathTitle() {
    switch (this.path) {
      case 'create':
        return 'Create link to your contact channel'
      case 'via':
      case 'via/:channel/:username':
      case 'via/:channel/:username/:action':
        return 'Contact the person via provided channel'
      case 'about':
        return 'Contact the person via any of provided channels'
      case 'help':
        return 'About service'
      case 'create/skills':
        return 'Create your skills list';
      case 'skills':
        return 'See the person\'s skills list';
      default:
        return 'Page not found'

    }
  }

}
