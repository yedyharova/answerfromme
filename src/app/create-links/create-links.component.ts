import { Component, OnInit } from "@angular/core";
import { LinkResolverService, Link } from "../link-resolver.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "create-links",
  templateUrl: "./create-links.component.html",
  styleUrls: ["./create-links.component.scss"],
})
export class CreateLinksComponent implements OnInit {
  links: Array<Link>;

  constructor(private linkResolver: LinkResolverService) {}

  ngOnInit() {
    this.links = this.linkResolver.links;

    this.links.forEach((link) => {
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

  createLink(linkObj: Link): void {
    linkObj.link = `${window.location.protocol}//${window.location.host}/via/${
      linkObj.channel
    }/${linkObj.username}/${linkObj.action || ""}${
      this.linkResolver.name
        ? "?name=" + encodeURIComponent(this.linkResolver.name)
        : ""
    }`;
  }

  copyHtmlLink(link: Link) {
    this.createLink(link);
    let forHtmllink = this.linkResolver.evalLink(link);
    let htmlLink = `<a href="${link.link}">${forHtmllink}</a>`;
    this.linkResolver.copyLink(htmlLink);
    this.linkResolver.success(`${link.type} HTML link was COPIED.`);
  }

  onChange(linkObj: Link): void {
    this.setLocalStrorage(linkObj);
    this.createLink(linkObj);
  }

  setLocalStrorage(link: Link): void {
    window.localStorage.setItem(
      link.channel,
      JSON.stringify({ username: link.username, action: link.action })
    );
  }

  copyLink(linkObj: Link) {
    this.createLink(linkObj);
    this.linkResolver.copyLink(linkObj.link);
    this.linkResolver.success(`${linkObj.type} link was COPIED.`);
  }

  tryLink(link: Link) {
    this.createLink(link);
    window.open(link.link);
  }
}
