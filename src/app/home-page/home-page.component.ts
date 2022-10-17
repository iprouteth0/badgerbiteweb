import { Component, OnInit } from '@angular/core';
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

  mainnetChains: Chain[] = [];
  testnetChains: Chain[] = [];
  archiveChains: Chain[] = [];
  searchQuery: string = '';
  chainType = 'all';
  showAbout = false;
  chainValidatorsSubscription: any;
  chain?: Chain;
  TotalClient: number[] = [];
  ValidatorSet?: any;
  Val?: string;
  TotalClients: number[] = [];

  constructor(private http: HttpClient, public chainService: ChainService, public stateService: StateService,config: NgbModalConfig, private modalService: NgbModal) {
    this.applyChainTypeWithFilter(this.chainType, "");
  }

  ngOnInit(): void {
 


    this.stateService.chainType.subscribe({
        next: (chainType: string) => {
          this.chainType = chainType;
          this.applyChainTypeWithFilter(chainType, this.searchQuery);
        }
      }
    );


    this.TotalClients[1]=10
    const z: number[] = []
    let x=""

    for (let i = 1; i < CHAINS.length; i++) { 
        this.Val = CHAINS[i].Valoper
        let apiChainId = CHAINS[i].apiChainId || CHAINS[i].id;
        this.chainValidatorsSubscription = this.chainService.getChainValidators(apiChainId)
        .subscribe((validators: any) => {
          this.TotalClient[i]=(this.extractTotalClients(validators));
          
          x += this.TotalClient[1];
          this.ValidatorSet = {
            clients: 5
          };   
    });
    
    }
  }



  ngAfterViewInit(): void {

    
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


  extractTotalClients(validators: any): any {
    validators.validators.sort((a: any, b: any) => b.rank - a.rank)
    validators.validators.reverse()
    let clients = 0;
    for (let i = 0; i < validators.validators.length; i++) {
      let validator = validators.validators[i];
      if (validator.operator_address == this.Val) {
          clients = validator.delegations.total_count;
          this.TotalClients[1] += validator.delegations.total_count
      }
    }
  return clients
  }

}


