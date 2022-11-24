import { Component, OnInit, Input } from '@angular/core';
import { Chain } from "../model/chain";
import { CHAINS } from '../data/data';
import { ChainService } from "../service/chain.service";
import { StateService } from "../service/state.service";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [NgbModalConfig, NgbModal]
})

export class HomePageComponent implements OnInit {

  @Input() sliderTopbar: boolean=false;
  navClass = 'nav-light';
  mainnetChains: Chain[] = [];
  testnetChains: Chain[] = [];
  archiveChains: Chain[] = [];
  searchQuery: string = '';
  chainType = 'all';
  showAbout = false;
  chainValidatorsSubscription: any;
  chainSummarySubscription: any;
  chainSummarySubscription2: any;
  chain?: Chain;
  public TotalClient: number = 244;
  ValidatorSet?: any;
  Val?: string;
  TotalTime: number[] = [];
  
  tokenakia: number = 0

  public assets: number = 0;
  public totalmainnets: number = 0;
  public totaltestnets: number = 0;
  clientcount: number = 0;
  assetcount:number = 0;
  assetcountformat: string=""
  mainnetcount:number=0;
  testnetcount:number=0;
  finished:boolean = false;

    clientcountstop:any = setInterval(()=>{
      this.TotalTime[1]++;
      if(this.clientcount < this.TotalClient) {
      this.clientcount++;
      }
      if (this.TotalClient> 500) {  

        if(this.TotalTime[1] >= 3000)
        {
          clearInterval(this.clientcountstop);
          // this.clientcount = this.TotalClient
        }
    }
    },9)

    assetcountstop:any = setInterval(()=>{
      this.TotalTime[2]++;
      if(this.assetcount < this.assets) {
      this.assetcount += 584;
      this.assetcountformat =this.assetcount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0
      });
      }
      if (this.assets > 300000) {  

        if(this.TotalTime[2] >= 3000)
        {
          clearInterval(this.assetcountstop);
          // this.clientcount = this.TotalClient
        }
    }
    },1)
    mainnetcountstop:any = setInterval(()=>{
      this.mainnetcount++
        if(this.mainnetcount >= this.totalmainnets)
        {
          clearInterval(this.mainnetcountstop);
          // this.clientcount = this.TotalClient
        }
   
    },400)
    testnetcountstop:any = setInterval(()=>{
      this.testnetcount++
        if(this.testnetcount >= this.totaltestnets)
        {
          clearInterval(this.testnetcountstop);
          // this.clientcount = this.TotalClient
        }
   
    },1100)


  constructor(private http: HttpClient, public chainService: ChainService, public stateService: StateService,config: NgbModalConfig, private modalService: NgbModal) {
    this.applyChainTypeWithFilter(this.chainType, "");
    for (let i = 0; i < CHAINS.length; i++) { 
      if (CHAINS[i].isArchive != true){
        this.tokenakia=0;
        this.Val = CHAINS[i].Valoper;
        let apiChainId = CHAINS[i].apiChainId || CHAINS[i].id;
        let DexID = CHAINS[i].DexScreener || "";
        const Price: number[] = [];
        const tokens: number[] = [];
        this.chainSummarySubscription2 = this.chainService.getDexSummary(DexID)
        .subscribe((DexSummary: any) => {
          let pricee = Number(DexSummary.pair.priceUsd);
        this.chainSummarySubscription = this.chainService.getChainValidators(apiChainId)
        .subscribe((summary: any) => {

          for (let k = 0; k < summary.validators.length; k++){
            if (CHAINS[i].Valoper == summary.validators[k].operator_address || summary.validators[k].moniker.includes("Badger") || summary.validators[k].moniker.includes("badger")){
              // this.assets += Math.floor(Number(summary.validators[k].delegations.total_usd)) || 0;
              this.TotalClient += Number(summary.validators[k].delegations.total_count) || 0;
              let tokenss = Number(summary.validators[k].delegations.total_tokens_display);
              this.assets += (tokenss * pricee) 
            }
          }
        });
        });

        


        if (this.chainService.filterByType(CHAINS[i],"mainnet") ){
          this.totalmainnets++
        }
        else if (this.chainService.filterByType(CHAINS[i],"testnet") ){
          this.totaltestnets++
        }
        this.ValidatorSet = {
          clients: this.testnetcount
        };

      }  
    }
  }

  ngOnInit(): void {
 


    this.stateService.chainType.subscribe({
        next: (chainType: string) => {
          this.chainType = chainType;
          this.applyChainTypeWithFilter(chainType, this.searchQuery);
        }
      }
    );

  }




  ngAfterViewInit(): void {


    this.clientcount = this.TotalClient
  }

  onSearchQueryChange(newQuery: string) {
    this.applyChainTypeWithFilter(this.chainType, newQuery)
  }

  applyChainTypeWithFilter(chainType: string, searchText: string): void {
    switch (chainType) {
      case 'mainnet':
        this.mainnetChains = this.chainService.getChains(chainType, searchText);
        this.testnetChains = [];
        this.archiveChains = this.chainService.getChains(chainType, searchText, true);
        break;
      case 'testnet':
        this.mainnetChains = [];
        this.testnetChains = this.chainService.getChains(chainType, searchText);
        this.archiveChains = this.chainService.getChains(chainType, searchText, true);
        break;
      case 'all':
      default:
        this.mainnetChains = this.chainService.getChains('mainnet', searchText);
        this.testnetChains = this.chainService.getChains('testnet', searchText);
        this.archiveChains = this.chainService.getChains('all', searchText, true);
    }
  }

  extractDexPriceUnformatted(DexSummary: any): number {
    let price = DexSummary.pair.priceUsd;
    // if (!price) {
    //   return 0;
    // }
    return Number(price)
  }
  /**
   * Change theme color
   */
   onChangeColor(color: string) {
    document
      .getElementById('color-opt')!
      .setAttribute('href', './assets/css/colors/' + color + '.css');
  }

  /**
   * Set dark theme
   */
  setDark() {
    document.getElementById('theme-opt')!.setAttribute('href', './assets/css/style-dark.min.css');
  }

  /**
   * Set light theme
   */
  setLight() {
    document.getElementById('theme-opt')!.setAttribute('href', './assets/css/style.min.css');
  }

  /**
   * Set dark-rtl theme
   */
  darkRtl() {
    document.getElementById('theme-opt')!.setAttribute('href', './assets/css/style-dark-rtl.min.css');
  }
  /**
   * Set dark-light theme
   */
  darkLtr() {
    document.getElementById('theme-opt')!.setAttribute('href', './assets/css/style-dark.min.css');
  }
  /**
   * Set rtl theme
   */
  setRtl() {
    document.getElementById('theme-opt')!.setAttribute('href', './assets/css/style-rtl.min.css');
  }
  /**
   * Set light theme
   */
  setLtr() {
    document.getElementById('theme-opt')!.setAttribute('href', './assets/css/style.min.css');
  }
  open(content: any) {
    this.modalService.open(content, { centered: true });
  }


}


