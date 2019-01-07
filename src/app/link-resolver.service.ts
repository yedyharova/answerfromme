import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';

//skype:yedyharova?chat  
//tg:resolve?domain=Yedyharova
//tel:+1234567890
//mailto:yedyharovaolena@gmail.com

@Injectable({
  providedIn: 'root'
})
export class LinkResolverService {

  skypeLink: Link = { 
    type: 'Skype',
    channel: 'skype',
    linkFormat: '${l.channel}:${l.username}?${l.action}',
    icon: 'assets/skype.png',
    placeholder: 'Username *',
    actions: [ 
      { name: 'Call Me', type: 'call' },
      { name: 'My User Info', type: 'userinfo' },
      { name: 'Add Me', type: 'add' },
      { name: 'Chat Me', type: 'chat' },
      { name: 'Send Me Voicemail', type: 'voicemail' }
    ],
    action: 'chat',
    formControl: new FormControl('', [
      Validators.pattern('[a-zA-Z0-9_-]*')
    ]),
    errorType: 'pattern',
    error: 'Wrong Username'
  };

  telegramLink: Link = {
    type: 'Telegram', 
    channel: 'tg',
    linkFormat: '${l.channel}:resolve?domain=${l.username}',
    icon: 'assets/telegram.png',       
    placeholder: 'Username *',
    formControl: new FormControl('', [
      Validators.pattern('[a-zA-Z0-9_-]*')
    ]),
    errorType: 'pattern',
    error: 'Wrong Username'
  };

  emailLink: Link = {
    type: 'Email',
    channel: 'mailto',
    linkFormat: '${l.channel}:${l.username}',
    icon: 'assets/email.png',      
    placeholder: 'Email *',
    formControl: new FormControl('', [
      Validators.email
    ]),
    errorType: 'email',
    error: 'Wrong Email'
  };

  phoneLink: Link = {
    type: 'Phone', 
    channel: 'tel', 
    linkFormat: '${l.action}:${l.username}',
    icon: 'assets/phone.png',      
    placeholder: 'Phone Number *',
    formControl: new FormControl('', [
      Validators.pattern('[+0-9]*')
    ]),
    actions: [ 
      { name: 'Call Me', type: 'tel' },
      { name: 'SMS Me', type: 'sms' }
    ],
    action: 'tel',
    errorType: 'pattern',
    error: 'Wrong Phone Number'  
  };

  get links(): Array<Link> {
    return [this.skypeLink/*, this.telegramLink*/, this.emailLink, this.phoneLink];
  }

  private linksHash: object = {};
  
  evalLink(l: Link):string {
    return eval('`' + l.linkFormat + '`');
  }

  getLink(channel: string, username: string, action?: string): Link {
    let l = this.linksHash[channel];
    if (l) {
      l.username = username;
      if (action) {
        l.action = action;
      }
    }
    return l;
  }

  copyLink(link: string) {
    let selBox = document.createElement('input');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  constructor() {
    this.links.forEach(link => this.linksHash[link.channel] = link);
  }
}

export type Link = {
  type: string;
  channel: string;
  linkFormat: string;
  icon: string;  
  placeholder: string;
  action?: string;
  actions?: Array<Action>
  username?: string;
  link?: string; 
  formControl?: FormControl;
  errorType?: string;
  error?: string;
  safeLink?: SafeUrl;
};

export type Action = {
  name: string;
  type: string;
};
