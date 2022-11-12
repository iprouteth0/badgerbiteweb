import { Component, OnInit, Input } from '@angular/core';
import { LeftHandMenuService } from "../service/left-hand-menu.service";
import { StateService } from "../service/state.service";
import { CHAINS } from '../data/data';
import { HttpClient } from '@angular/common/http';
import { ChainService } from "../service/chain.service";
import { Chain } from "../model/chain";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() navClass: string = "nav-light";
  chain: String[] = [];
  ChainId: String[] = [];
  Price: String[] = [];
  Change: String[] = [];
  Negative: Boolean[] = [];
  chainSummarySubscription: any;

sliderTopbar?: boolean;

  constructor(private leftHandMenuService: LeftHandMenuService,
              public stateService: StateService,private http: HttpClient, public chainService: ChainService) {

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

}
