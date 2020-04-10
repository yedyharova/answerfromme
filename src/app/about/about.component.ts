import { Component, OnInit } from "@angular/core";
import { LinkResolverService, Link } from "../link-resolver.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
})
export class AboutComponent implements OnInit {
  name: string;
  links: Array<Link>;
  isPageAboutUser: boolean = false;

  constructor(
    private linkResolver: LinkResolverService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.links = this.linkResolver.links;
    let paramsHash = this.linkResolver.getParamsFromLocation();
    if (paramsHash["name"]) {
      this.name = paramsHash["name"];
    }

    this.links.forEach((link) => {
      link.username = paramsHash[link.channel];
      this.isPageAboutUser = !!link.username;
      link.link = this.linkResolver.evalLink(link);
      link.safeLink = this.sanitizer.bypassSecurityTrustUrl(
        this.linkResolver.evalLink(link)
      );
    });

    this.linkResolver.setAboutHistory(this.name || "anonymous");
  }

  getActionName(link: Link) {
    let actionName = "";
    if (link.action) {
      link.actions.forEach((action) => {
        if (action.type === link.action) {
          actionName = action.name;
        }
      });
    }
    return actionName;
  }

  onChange(linkObj: Link) {
    linkObj.link = this.linkResolver.evalLink(linkObj);
    linkObj.safeLink = this.sanitizer.bypassSecurityTrustUrl(
      this.linkResolver.evalLink(linkObj)
    );
  }

  copyLink(link: Link) {
    this.linkResolver.copyLink(link.link);
    this.linkResolver.success("Link was COPIED");
  }

  copyUsername(username) {
    this.linkResolver.copyLink(username);
    this.linkResolver.success("Data were COPIED");
  }
}
