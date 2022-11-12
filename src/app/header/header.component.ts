import { Component, OnInit, Input } from '@angular/core';
import { LeftHandMenuService } from "../service/left-hand-menu.service";
import { StateService } from "../service/state.service";
import { CHAINS } from '../data/data';
import { HttpClient } from '@angular/common/http';
import { ChainService } from "../service/chain.service";
import { Chain } from "../model/chain";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() navClass: string = "nav-light";
  @Input() sliderTopbar: boolean=true;
  @Input() buttonList: boolean=true;

  chain: String[] = [];
  testnet: String[] = [];
  ChainId: String[] = [];
  Price: String[] = [];
  Change: String[] = [];
  Negative: Boolean[] = [];
  isCondensed: Boolean=false
  chainSummarySubscription: any;

// sliderTopbar?: boolean;

  constructor(private leftHandMenuService: LeftHandMenuService,
              public stateService: StateService,private http: HttpClient, public chainService: ChainService,private router: Router, private modalService: NgbModal) {
                this.router.events.forEach((event) => {
                  if (event instanceof NavigationEnd) {
                    // this._activateMenuDropdown();
                  }
                });

    for (let i = 0; i < CHAINS.length && !CHAINS[i].isTestnet; i++) {
      let apiChainId = CHAINS[i].apiChainId || CHAINS[i].id;
      this.chain[i]=apiChainId
      let coingekoCoinId = CHAINS[i].coingekoCoinId || CHAINS[i].id;
      this.ChainId[i]=apiChainId
      this.chainSummarySubscription = this.chainService.getCoingekoSummary(coingekoCoinId)
      .subscribe((coingekoSummary: any) => {
        this.Price[i] = this.extractPrice(coingekoSummary);
        this.Change[i] = this.extractPriceChange(coingekoSummary);
        this.Negative[i]=true
        let a = Number(this.Change[i]) || 0;
        if (a <= 0) { 
          this.Negative[i]=false
          this.Change[i]=a.toFixed(2) +'%'
        } else {
          // else statements;
          this.Change[i]='+' + a.toFixed(2) +'%'
        }
      });
    } 
    let p=0
    for (let k = 0; k < CHAINS.length; k++) {
      if (CHAINS[k].isTestnet){
        let apiChainId = CHAINS[k].apiChainId || CHAINS[k].id;
        this.testnet[p]=apiChainId
        p++
      }
    }          

  }

  ngOnInit(): void {
  }

  openLeftHandMenuForMobile(): void {
    this.leftHandMenuService.openLeftHandMenuForMobile();
  }

  extractPrice(coingekoSummary: any): string {
    let price = coingekoSummary?.market_data?.current_price?.usd;
    if (!price) {
      return '-';
    }
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumSignificantDigits: 4
    }).format(price);
  }
  
  extractPriceUnformated(coingekoSummary: any): any {
    let price = coingekoSummary?.market_data?.current_price?.usd;
    if (!price) {
      return '-';
    }

    return price
  }

  extractPriceChange(coingekoSummary: any): any {
    let price = coingekoSummary?.market_data?.price_change_percentage_24h;
    if (!price) {
      return '-';
    }

    return price
  }

  _activateMenuDropdown() {
    /**
     * Menu activation reset
     */
    const resetParent = (el) => {
      el.classList.remove("active");
      const parent = el.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.remove("active");
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.remove("active");
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("active");
            const parent4 = parent3.parentElement;
            if (parent4) {
              const parent5 = parent4.parentElement;
              parent5.classList.remove("active");

            }
          }
        }
      }
    };
    let links = document.getElementsByClassName("nav-link-ref");
    let matchingMenuItem = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // reset menu
      resetParent(links[i]);
    }
    for (let i = 0; i < links.length; i++) {
      if (window.location.pathname === links[i]["pathname"]) {
        // matchingMenuItem = links[i];
        break;
      }
    }

    if (matchingMenuItem) {
      // matchingMenuItem.classList.add("active");
      // const parent = matchingMenuItem.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      // if (parent) {
      //   // parent.classList.add("active");
      //   // const parent2 = parent.parentElement;
      //   if (parent2) {
      //     parent2.classList.add("active");
      //     const parent3 = parent2.parentElement;
      //     if (parent3) {
      //       parent3.classList.add("active");
      //       const parent4 = parent3.parentElement;
      //       if (parent4) {
      //         const parent5 = parent4.parentElement;
      //         parent5.classList.add("active");

      //         document.getElementById("navigation").style.display = "none";
      //         this.isCondensed = false;
      //       }
      //     }
      //   }
      // }
    }
  }

  windowScroll() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      document.getElementById("topnav")!.classList.add("nav-sticky");
    } else {
      document.getElementById("topnav")!.classList.remove("nav-sticky");
    }
    if (document.getElementById("back-to-top")) {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        document.getElementById("back-to-top")!.style.display = "inline";
      } else {
        document.getElementById("back-to-top")!.style.display = "none";
      }
    }
  }
  toggleMenu() {
    this.isCondensed = !this.isCondensed;
    if (this.isCondensed) {
      document.getElementById("navigation")!.style.display = "block";
    } else {
      document.getElementById("navigation")!.style.display = "none";
    }
  }
  onMenuClick(event) {
    event.preventDefault();
    const nextEl = event.target.nextSibling.nextSibling;
    if (nextEl && !nextEl.classList.contains("open")) {
      const parentEl = event.target.parentNode;
      if (parentEl) {
        parentEl.classList.remove("open");
      }
      nextEl.classList.add("open");
    } else if (nextEl) {
      nextEl.classList.remove("open");
    }
    return false;
  }

  developerModal(content) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  wishListModal(content) {
    this.modalService.open(content, { centered: true });
  }

}
