import { Component, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { LeftHandMenuService } from "./service/left-hand-menu.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  title = 'badgerbite';
   addclass: string='bg-white';
   buttonShow: boolean=false;
   TopbarShow: boolean=true;
   footerClass: string='true';
   developerPage: boolean=false;
   hideFooter: boolean=false;
   shopPages: boolean=false;
 
  constructor(@Inject(DOCUMENT) private document: Document,
              private leftHandMenuService: LeftHandMenuService) {
  }

  closeLeftHandMenuForMobile(): void {
    let body = document.getElementsByTagName('body');
    if (body && body.length && body[0].classList.contains('left-hand-menu-open')) {
      this.leftHandMenuService.closeLeftHandMenuForMobile();
    }
  }

  onActivate(componentReference: any) {
    this.addclass = componentReference.navClass;
    this.buttonShow = componentReference.buttonList;
    this.TopbarShow = componentReference.sliderTopbar;
    this.footerClass = componentReference.footerVariant;
    this.developerPage = componentReference.isdeveloper;
    this.hideFooter = componentReference.hideFooter;
    this.shopPages = componentReference.shopPages;
  }
}
