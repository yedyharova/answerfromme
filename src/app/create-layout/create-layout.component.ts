import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LinkResolverService, Link } from '../link-resolver.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'create-layout',
  templateUrl: './create-layout.component.html',
  styleUrls: ['./create-layout.component.scss']
})
export class CreateLayoutComponent implements OnInit {

  name: string;

  @ViewChild('nameInput') nameInput: ElementRef;

  constructor(private linkResolver: LinkResolverService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Channel\'s links | Answer from me');
    this.name = this.linkResolver.initName();
    this.checkNameInputClass();
  }

  onChangeName() {
    this.linkResolver.name = this.name;
    this.checkNameInputClass();    
  }

  private checkNameInputClass():void {
    [25, 30, 35, 40, 45].forEach( suffix => {
      this.setClass(this.nameInput.nativeElement, this.name.length, suffix);
    });    
  }

  private setClass(target: any, length: number, suffix: number) {
    if (length >= suffix && length < suffix + 5) {
      target.classList.add('length' + suffix);
    } else {
      target.classList.remove('length' + suffix);
    }
  }

  tryAllLink() {
    let link = this.linkResolver.createAllLinkFromStorage();
    if (link) {
      window.open(link);
    } else {
      this.linkResolver.warn('Data is EMPTY');
    }
  }

  copyAllLink() {
    let link = this.linkResolver.createAllLinkFromStorage();
    let message = 'Data is EMPTY';
    if (link) {
      this.linkResolver.copyLink(link);
      this.linkResolver.success('Link was COPIED');
    } else {
      this.linkResolver.warn('Data is EMPTY');
    }
  }

  copyHtmlAllLink() {
    let link = this.linkResolver.createAllLinkFromStorage();
    if (link) {
      let htmlLink = `<a href=${link}>${this.name || 'The person'} contacts</a>`;
      this.linkResolver.copyLink(htmlLink);
      this.linkResolver.success('HTML Link code was COPIED');
    } else {
      this.linkResolver.warn('Data is EMPTY');
    }
  }

}
