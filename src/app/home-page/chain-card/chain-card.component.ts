import { Component, Input, OnInit } from '@angular/core';
import { Chain } from "../../model/chain";
import { UtilsService } from "../../service/utils.service";
import { ChainService } from "../../service/chain.service";
export class NgbdAlertBasic {
}
@Component({
  selector: 'app-chain-card',
  templateUrl: './chain-card.component.html',
  styleUrls: ['./chain-card.component.css']
})
export class ChainCardComponent implements OnInit {
  
  gov?: any;
  summary?: any;
  chainSummarySubscription: any;
  chainSummarySubscription2: any;
  price?: string;
  @Input() chain?: Chain;

  constructor(public utilsService: UtilsService, public chainService: ChainService) {
  }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {

    this.chainService.getGovStatus(this.chain!.id)
       .subscribe((gov: any) => {

            this.gov = gov;
            this.gov.Active = this.GetGov(gov);
            this.gov.ID = this.GetGovId(gov);
      });

      this.chainService.getChainSummary(this.chain!.id)
      .subscribe((summary: any) => {
        this.summary = summary;
      });
      let coingekoCoinId = this.chain!.coingekoCoinId || this.chain!.id;
      let DexID = this.chain!.DexScreener || "";
      this.chainSummarySubscription = this.chainService.getDexSummary(DexID)
      .subscribe((coingekoSummary: any) => {
        this.price = this.extractDexPrice(coingekoSummary);
      }); 
      if (this.chain!.DexScreener===""){
        this.chainSummarySubscription2 = this.chainService.getCoingekoSummary(coingekoCoinId)
        .subscribe((coingekoSummar: any) => {
         this.price = this.extractPrice(coingekoSummar);
        });
      }
  }

  GetGov(gov: any): boolean {
  let Status = false
  if (gov.result.length > 0) {
    Status = true; 
} else {Status = false;}

  return Status
  }

GetGovId(gov: any): number {
let Id = 0
if (gov.result.length > 0) {
  Id =  gov.result[0].id
}

return Id
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

extractDexPrice(DexSummary: any): string {
  let price = DexSummary?.pair?.priceUsd;
  if (!price) {
    return '-';
  }
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 4
  }).format(price);
}

}
