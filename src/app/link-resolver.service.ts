import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

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
      { name: 'Chat Me', type: 'chat' }
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
    linkFormat: '${l.channel}://resolve?domain=${l.username}',
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
    return [this.skypeLink, this.telegramLink, this.emailLink, this.phoneLink];
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

  private _name: string;

  get name() {
    return this._name;
  }

  set name(theName: string) {
    this._name = theName;
    window.localStorage.setItem('name', this.name);
  }

  initName():string {
    this._name = window.localStorage.getItem('name');
    return this.name || '';
  }

  createAllLinkFromStorage():string {
    let search = '';
    this.links.forEach(link => {
      let storedData = window.localStorage.getItem(link.channel);
      if (storedData) {
        let storedObj = JSON.parse(storedData);
        if (storedObj.username) {
          if (search.length) search += '&';
          search += `${link.channel}=${encodeURIComponent(storedObj.username)}`;
        }
      }
    });
    if (search.length) {
      if (this.name) {
        search = `name=${encodeURIComponent(this.name)}&` + search;
      }
      return `${window.location.protocol}//${window.location.host}/about?${search}`;
    }
    return null;
  }

  getParamsFromLocation():object {
    let search = window.location.search.split(/\&|\?/gm);
    let paramsHash = {};
    search.forEach(term => {
      let parts = term.split('=');
      if (parts && parts.length > 1) {    
        paramsHash[parts[0]] = decodeURIComponent(parts[1]);   
      }
    });
    return paramsHash;
  }

  setAboutHistory(name: string) {
    let date = new Date();
    let key = `about: ${name}`;
    let value = {date: date, link: window.location.href};
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getAboutHistory():Array<any> {
    let aboutStorage = [];
    for (let key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        if (key.indexOf('about: ') === 0) {
          let value = JSON.parse(localStorage.getItem(key));
          aboutStorage.push({key: key.substr(6, key.length), date: value.date, link: value.link});
        }
      }
    }

    aboutStorage.sort((about1, about2) => {
      let date1= about1.date.toUpperCase();
      let date2 = about2.date.toUpperCase();
      if (date1 < date2) return -1;
      if (date1 > date2) return 1;
      return 0;
    });

    if (aboutStorage.length > 5) {
      let count = aboutStorage.length - 5;
      while (count) {
        let elem = aboutStorage.shift();
        window.localStorage.removeItem(`about: ${elem.key}`);
        count--;
      }
    }
    aboutStorage.reverse();
    return aboutStorage;
  }

  snackBarConfig:object = {
    duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'
  };

  snackBarAction: string = 'Ok';

  warn(message: string) {
    this.snackBar.open(message, this.snackBarAction, { ...this.snackBarConfig, ...{panelClass: 'warn'} });
  }

  success(message: string) {
    this.snackBar.open(message, this.snackBarAction, this.snackBarConfig);
  }  

  constructor(public snackBar: MatSnackBar) {
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
