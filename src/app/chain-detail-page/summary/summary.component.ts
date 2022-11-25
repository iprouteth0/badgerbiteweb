import { Component, OnInit } from '@angular/core';
import { ChainService } from "../../service/chain.service";
import { Chain } from "../../model/chain";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';
import { ActivatedRoute, Router } from "@angular/router";
import { UtilsService } from "../../service/utils.service";
import { resetFakeAsyncZone } from '@angular/core/testing';
Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  sliderTopbar = false;
  chain?: Chain;
  price?: string;
  priceunformatted?: any;
  summary?: any;
  CHART_INTERVAL_DAYS: number;
  noPrices?: boolean;
  noVolumes?: boolean;
  noMissedBlocks?: boolean;
  bondedTokensRatio?: any;
  tokensDistributionRatio?: any;
  ValidatorSet?: any;
  athPriceRatio?: any;

  innerStrokeColor_SUCCESS: string;
  outerStrokeColor_SUCCESS: string;
  innerStrokeColor_WARN: string;
  outerStrokeColor_WARN: string;
  innerStrokeColor_DANGER: string;
  outerStrokeColor_DANGER: string;

  chainSummarySubscription: any;
  coingekoMarketDataSubscription: any;
  chainValidatorsSubscription: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public chainService: ChainService,
              public utilsService: UtilsService) {
    this.CHART_INTERVAL_DAYS = 14;
    this.innerStrokeColor_SUCCESS = 'rgba(120, 192, 0, 0.4)';
    this.outerStrokeColor_SUCCESS = 'rgba(120, 192, 0, 1)';
    this.innerStrokeColor_WARN = 'rgba(255, 193, 7, 0.4)';
    this.outerStrokeColor_WARN = 'rgba(255, 193, 7, 1)';
    this.innerStrokeColor_DANGER = 'rgba(220, 53, 69, 0.4)';
    this.outerStrokeColor_DANGER = 'rgba(220, 53, 69, 1)';
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    
    this.chain = this.chainService.activeChain;
    if (this.chain && !this.chain.summaryDisabled) {
      let apiChainId = this.chain.apiChainId || this.chain.id;
      this.chainService.getChainSummary(apiChainId)
        .subscribe((summary: any) => {
          if (this.chain) {
            let ratio = this.extractBondedTokensRatio(this.chain, summary);
            this.bondedTokensRatio = {
              ratio: ratio,
              innerStrokeColor: this.innerStokeColorForRatio(ratio, 10, 25),
              outerStrokeColor: this.outerStokeColorByRatio(ratio, 10, 25)
            };
            this.summary = summary;
            this.summary.blockTime = this.extractBlockTime(summary);
            this.summary.inflation = this.extractInflation(summary);
            this.summary.bondedTokens = this.extractBondedTokens(this.chain, summary);
            this.summary.totalSupply = this.extractTotalSupply(this.chain, summary);

            // this.summary.communityPool = this.extractCommunityPool(this.chain, summary);
          }
        });
      let coingekoCoinId = this.chain.coingekoCoinId || this.chain.id;
      this.chainSummarySubscription = this.chainService.getCoingekoSummary(coingekoCoinId)
        .subscribe((coingekoSummary: any) => {
          this.price = this.extractPrice(coingekoSummary);
          this.priceunformatted = this.extractPriceUnformated(coingekoSummary);
          let ratio = this.extractAthPriceRatio(coingekoSummary);
          if (ratio) {
            this.athPriceRatio = {
              ratio: ratio,
              innerStrokeColor: this.innerStokeColorForRatio(ratio, 10, 40),
              outerStrokeColor: this.outerStokeColorByRatio(ratio, 10, 40)
            };
          }
        });

        let DexID = this.chain.DexScreener || "";
        this.chainSummarySubscription = this.chainService.getDexSummary(DexID)
        .subscribe((coingekoSummary: any) => {
          this.price = this.extractDexPrice(coingekoSummary);
          this.priceunformatted = this.extractDexPriceUnformatted(coingekoSummary);
        });  

      this.coingekoMarketDataSubscription = this.chainService.getCoingekoMarketData(coingekoCoinId, this.CHART_INTERVAL_DAYS)
        .subscribe((coingekoMarketData: any) => {
          this.drawPriceChart(coingekoMarketData);
          this.drawVolumeChart(coingekoMarketData);
        });

       this.chainValidatorsSubscription = this.chainService.getChainValidators(apiChainId)
        .subscribe((validators: any) => {
          if (this.chain) {
            let ratio = this.extractTokensDistributionRatio(validators);
            this.tokensDistributionRatio = {
              ratio: ratio,
              innerStrokeColor: this.innerStokeColorForRatio(ratio, 10, 25),
              outerStrokeColor: this.outerStokeColorByRatio(ratio, 10, 25)
            };
            let active = this. extractTotalActive(validators);
            let total=this.extractTotalVal(validators);
            let jailed=this.extractTotalJailed(validators);
            let rank=this.extractRank(validators);
            let clients=this.extractClients(validators);
            let assets=this.extractAssets(this.chain, validators);
            this.ValidatorSet = {
                active: active,
                total: total,
                jailed: jailed,
                rank: rank,
                clients: clients,
                assets: assets,
            };

            this.drawVotingPowerChart(validators, this.chain);
            this.drawCommissionDistributionChart(validators);
            this.drawMissedBlocksChart(validators);
          }
        });
    } else {
      this.router.navigateByUrl('/');
    }
  }

  ngOnDestroy(): void {
    if (this.chainSummarySubscription) {
      this.chainSummarySubscription.unsubscribe();
    }
    if (this.coingekoMarketDataSubscription) {
      this.coingekoMarketDataSubscription.unsubscribe();
    }
    if (this.chainValidatorsSubscription) {
      this.chainValidatorsSubscription.unsubscribe();
    }
  }

  extractBlockTime(summary: any): string {
    return Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
    }).format(summary.chain.params.actual_block_time) + 's';
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
  
  extractPriceUnformated(coingekoSummary: any): any {
    let price = coingekoSummary?.market_data?.current_price?.usd;
    if (!price) {
      return '-';
    }
    return price
  }

  extractDexPriceUnformatted(DexSummary: any): any {
    let price = DexSummary.pair.priceUsd;
    // if (!price) {
    //   return 0;
    // }
    return Number(price)
  }

  extractInflation(summary: any): string {
    let inflation = summary.chain.params.base_inflation;
    if (!inflation) {
      return '-';
    }
    return this.displayPercent(inflation);
  }

  displayPercent(val: any): string {
    return Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      style: 'percent'
    }).format(val);
  }

  extractBondedTokens(chain: Chain, summary: any): number {
    let bondedTokens = summary.chain.params.bonded_tokens / Math.pow(10, chain.denomPow);
    return bondedTokens
  }
  extractTotalSupply(chain: Chain, summary: any): string {
    let totalSupply = summary.chain.params.total_supply;
    totalSupply = totalSupply / Math.pow(10, chain.denomPow);
    return this.utilsService.compactNumber(totalSupply);
  }


  // extractCommunityPool(chain: Chain, summary: any): string {
  //  let communityPool = 0;
  //   summary.communityPool.forEach(function (item: any) {
  //     if (item.denom === chain.denomName) {
  //       communityPool = +item.amount;
  //     }
  //   });
  //   communityPool = communityPool / Math.pow(10, chain.denomPow);
  //   return this.utilsService.compactNumber(communityPool);
  // }

  extractBondedTokensRatio(chain: Chain, summary: any): number {

    let bondedTokens = 0
 
    bondedTokens = summary.chain.params.bonded_ratio*100;
   
    return bondedTokens
  }


  extractTotalVal(validators: any): number {
    validators.validators.sort((a: any, b: any) => b.rank - a.rank)
    validators.validators.reverse()
    return validators.validators.length
  }
  
  extractTotalActive(validators: any): number {
    validators.validators.sort((a: any, b: any) => b.rank - a.rank)
    validators.validators.reverse()
    let TotalActive=0;
    for (let i = 0; i < validators.validators.length; i++) {
      let validator = validators.validators[i];
      if (validator.active==true) {
        TotalActive++;
      }
    }
    return TotalActive
  }
  extractTotalJailed(validators: any): number {
    validators.validators.sort((a: any, b: any) => b.rank - a.rank)
    validators.validators.reverse()
    let TotalActive=0;
    for (let i = 0; i < validators.validators.length; i++) {
      let validator = validators.validators[i];
      if (validator.jailed==true) {
        TotalActive++;
      }
    }
    return TotalActive
  }

  extractRank(validators: any): any {
    validators.validators.sort((a: any, b: any) => b.rank - a.rank)
    validators.validators.reverse()
    let ranking = 0;
    for (let i = 0; i < validators.validators.length; i++) {
      let validator = validators.validators[i];
      if (validator.operator_address == this.chain?.Valoper) {
          ranking = validator.rank;
      }
    }
  return ranking
  }

  extractClients(validators: any): any {
    validators.validators.sort((a: any, b: any) => b.rank - a.rank)
    validators.validators.reverse()
    let clients = 0;
    for (let i = 0; i < validators.validators.length; i++) {
      let validator = validators.validators[i];
      if (validator.operator_address == this.chain?.Valoper) {
          clients = validator.delegations.total_count;
      }
    }
  return clients
  }

  extractTotalClients(validators: any): any {
    validators.validators.sort((a: any, b: any) => b.rank - a.rank)
    validators.validators.reverse()
    let clients = 0;
    for (let i = 0; i < validators.validators.length; i++) {
      let validator = validators.validators[i];
      if (validator.operator_address == this.chain?.Valoper) {
          clients = validator.delegations.total_count;
      }
    }
  return clients
  }


  extractAssets(chain: Chain, validators: any): any {
    validators.validators.sort((a: any, b: any) => b.rank - a.rank)
    validators.validators.reverse()
    let pow = Math.pow(10, chain.denomPow);
    let price = this.priceunformatted;
    let assets = 0;
    for (let i = 0; i < validators.validators.length; i++) {
      let validator = validators.validators[i];
      if (validator.operator_address == this.chain?.Valoper || validator.moniker.includes("Badger") || validator.moniker.includes("badger")) {
          assets += Math.round(validator.tokens) * price / pow ;
      }
    }
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 4
  }).format(assets)
  }

  extractTokensDistributionRatio(validators: any): number {
    validators.validators.sort((a: any, b: any) => b.rank - a.rank)
    validators.validators.reverse()
    let totalVotingPower = 0;
    totalVotingPower = this.summary?.chain.params.bonded_tokens;
    // validators.validators.forEach((validators: any) => {
    //   totalVotingPower += validators.delegations.total_tokens_display;
    // });
    let validatorsNum = 0;
    let tmpVotingPower = 0;
    let percentage = 0;
    let TotalActive=0;
    for (let i = 0; i < validators.validators.length; i++) {
      let validator = validators.validators[i];
      if (validator.active==true) {
        TotalActive++;
      }
    }
    for (let i = 0; i < validators.validators.length && !percentage; i++) {
      let validator = validators.validators[i];
      if (validator.active==true) {
        tmpVotingPower = tmpVotingPower + Math.round (validator.delegations.total_tokens);
        validatorsNum++;
      }
      if (tmpVotingPower / totalVotingPower * 100 >= 50) {
        percentage = +(validatorsNum / TotalActive * 100).toFixed(2);
      }
    }
    // percentage=(100-percentage);
    percentage=percentage*2;
    return percentage;
  }

  extractAthPriceRatio(coingekoSummary: any): any {
    let currentPrice = coingekoSummary?.market_data?.current_price?.usd;
    let athPrice = coingekoSummary?.market_data?.ath?.usd;
    if (!currentPrice || !athPrice) {
      return;
    }
    return +(currentPrice / athPrice * 100).toFixed(2);
  }

  innerStokeColorForRatio(ratio: number, limit1: number, limit2: number) : string {
    return ratio <= limit1
      ? this.innerStrokeColor_DANGER
      : ratio <= limit2
        ? this.innerStrokeColor_WARN
        : this.innerStrokeColor_SUCCESS;
  }

  outerStokeColorByRatio(ratio: number, limit1: number, limit2: number) : string {
    return ratio <= limit1
      ? this.outerStrokeColor_DANGER
      : ratio <= limit2
        ? this.outerStrokeColor_WARN
        : this.outerStrokeColor_SUCCESS;
  }

  drawPriceChart(coingekoMarketData: any): void {
    let prices = coingekoMarketData.prices.slice(0, -1);
    if (!prices.length) {
      this.noPrices = true;
      return;
    }

    let pricesX = prices.map((item: any) => item[0]);
    let pricesY = prices.map((item: any) => item[1]);

    let pricesLabels: any = [];
    pricesX.forEach((item: any) => {
      let priceLabel = new Date(item);
      pricesLabels.push(priceLabel.toLocaleDateString('en', {month: 'short', day: 'numeric'}));
    });
    
    
    let priceChart = new Chart('priceChart', {
      type: 'line',
      data: {
        labels: pricesLabels,
        datasets: [
          {
            data: pricesY,
            borderColor: "rgb(234, 128, 252)",
            backgroundColor: "rgb(234, 128, 252, 0.1)",
            fill: true,
            borderWidth: 2,
            tension: 0.4,
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            titleFont: {
              size: 20,
              family: 'Monaco'
            },
            bodyFont: {
              size: 20,
              family: 'Monaco'
            },
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(context.parsed.y);
                }
                return label;
              }
            }
          }
        },
        responsive: true,
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            ticks: {
              font: {
                size: 15,
                family: 'Monaco'
              }
            }
          },
          y: {
            display: true,
            ticks: {
              font: {
                size: 15,
                family: 'Monaco'
              }
            }
          }
        }
      }
    });
  }

  drawVolumeChart(coingekoMarketData: any): void {
    let _this = this;
    let volume = coingekoMarketData.total_volumes.slice(0, -1);
    if (!volume.length) {
      this.noVolumes = true;
      return;
    }

    let volumeX = volume.map((item: any) => item[0]);
    let volumeY = volume.map((item: any) => item[1]);

    let volumeLabels: any = [];
    volumeX.forEach((item: any) => {
      let volumeLabel = new Date(item);
      volumeLabels.push(volumeLabel.toLocaleDateString('en', {month: 'short', day: 'numeric'}));
    });

    let volumeChart = new Chart('volumeChart', {
      type: 'line',
      data: {
        labels: volumeLabels,
        datasets: [
          {
            data: volumeY,
            borderColor: "rgb(234, 128, 252)",
            backgroundColor: "rgb(234, 128, 252, 0.1)",
            fill: true,
            borderWidth: 2,
            tension: 0.4,
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            titleFont: {
              size: 20,
              family: 'Monaco'
            },
            bodyFont: {
              size: 20,
              family: 'Monaco'
            },
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(context.parsed.y);
                }
                return label;
              }
            }
          }
        },
        responsive: true,
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            ticks: {
              font: {
                size: 15,
                family: 'Monaco'
              }
            }
          },
          y: {
            display: true,
            ticks: {
              font: {
                size: 15,
                family: 'Monaco'
              },
              callback: function (value) {
                return _this.utilsService.compactNumber(parseInt(value.toString()), 2);
              }
            },
          }
        }
      }
    });
  }

  drawVotingPowerChart(validators: any, chain: Chain): void {
    let _this = this;
    validators.validators.sort((a: any, b: any) => b.delegations.total_tokens_display - a.delegations.total_tokens_display)
    let top20validators = validators.validators.slice(0, 9);
    let labels = top20validators.map((validator: any) => validator.moniker);
    let data = top20validators.map((validator: any) => Math.round(validator.delegator_shares/ Math.pow(10, chain.denomPow)));
    let votingPowerChart = new Chart('votingPowerChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              '#89D4F5', '#BCD759', '#FFBF00', '#9961A7',
              '#4891EA', '#EE965B', '#F284D1', '#6FDBCB',
              '#2D71C4', '#EF5A5A', '#609C29', '#C69B06',
              '#8A2299', '#996D6C', '#2F2F6C', '#1C6C61',
            ]
          }
        ]
      },
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            titleFont: {
              size: 20,
              family: 'Monaco'
            },
            bodyFont: {
              size: 20,
              family: 'Monaco'
            },
            callbacks: {
              title: function () {
                return ''
              },
              label: function (context) {
                let label = context.label || '';
                let value = context.dataset.data[context.dataIndex];
                return label  + ': ' + value;
              },
            },
          }
        },
        responsive: true,
        scales: {
          y: {
            display: true,
            ticks: {
              font: {
                size: 15,
                family: 'Monaco'
              },
              callback: function (value, index) {
                let label = this.getLabelForValue(index);
                return label && label.length > 15
                  ? label.substring(0, 11) + '...'
                  : label;
              }
            }
          },
          x: {
            display: true,
            ticks: {
              precision: 0,
              font: {
                size: 15,
                family: 'Monaco'
              },
              callback: function (value) {
                return _this.utilsService.compactNumber(parseInt(value.toString()));
              }
            }
          }
        }
      }
    });
  }

  drawCommissionDistributionChart(validators: any): void {
    let commissionDistribution: any = {};
    validators.validators.forEach((validator: any) => {
      if (!commissionDistribution[validator.commission.commission_rates.rate]) {
        commissionDistribution[validator.commission.commission_rates.rate] = 0;
      }
      commissionDistribution[validator.commission.commission_rates.rate]++;
    });

    let sortableArray: any = [];
    for (let commission in commissionDistribution) {
      sortableArray.push([commission, commissionDistribution[commission]]);
    }

    sortableArray = sortableArray.sort((a: any, b: any) => b[1] - a[1]);
    sortableArray = sortableArray.slice(0, 5);

    let labels = sortableArray.map((res: any) => this.displayPercent(res[0]));
    let data = sortableArray.map((res: any) => res[1]);
    let commissionChart = new Chart('commissionChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              '#89D4F5', '#BCD759', '#FFBF00', '#9961A7',
              '#4891EA', '#EE965B', '#F284D1', '#6FDBCB',
              '#2D71C4', '#EF5A5A', '#609C29', '#C69B06',
              '#8A2299', '#996D6C', '#2F2F6C', '#1C6C61',
            ]
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            titleFont: {
              size: 20,
              family: 'Monaco'
            },
            bodyFont: {
              size: 20,
              family: 'Monaco'
            },
            callbacks: {
              title: function () {
                return ''
              },
              label: function (context) {
                let label = context.label || '';
                let value = context.dataset.data[context.dataIndex];
                return label  + ': ' + value;
              },
            },
          }
        },
        responsive: true,
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            ticks: {
              font: {
                size: 15,
                family: 'Monaco'
              }
            }
          },
          y: {
            display: true,
            ticks: {
              precision: 0,
              font: {
                size: 15,
                family: 'Monaco'
              }
            }
          }
        }
      }
    });
  }

  drawMissedBlocksChart(validators: any): void {

    validators.validators.sort((a: any, b: any) => b.missed_blocks_periods[1]?.missed - a.missed_blocks_periods[1]?.missed)
    // validators.validators.reverse()
    let topActivevalidators = validators.validators.slice(0, 125);
    let labels = validators.validators.filter((validator: any) => validator.missed_blocks_periods[1]?.missed && validator.active).map((validator: any) => validator.moniker);
    let data = validators.validators.filter((validator: any) => validator.missed_blocks_periods[1]?.missed && validator.active).map((validator: any) => validator.missed_blocks_periods[1]?.missed);

    if (!data.length) {
      this.noMissedBlocks = true;
      return;
    }

    let missedBlocksChart = new Chart('missedBlocksChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              '#89D4F5', '#BCD759', '#FFBF00', '#9961A7',
              '#4891EA', '#EE965B', '#F284D1', '#6FDBCB',
              '#2D71C4', '#EF5A5A', '#609C29', '#C69B06',
              '#8A2299', '#996D6C', '#2F2F6C', '#1C6C61',
            ]
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            titleFont: {
              size: 20,
              family: 'Monaco'
            },
            bodyFont: {
              size: 20,
              family: 'Monaco'
            },
            callbacks: {
              title: function () {
                return ''
              },
              label: function (context) {
                let label = context.label || '';
                let value = context.dataset.data[context.dataIndex];
                return label  + ': ' + value;
              },
            },
          }
        },
        responsive: true,
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            ticks: {
              font: {
                size: 15,
                family: 'Monaco'
              },
              callback: function (value, index) {
                let label = this.getLabelForValue(index);
                return label && label.length > 15
                  ? label.substring(0, 11) + '...'
                  : label;
              }
            }
          },
          y: {
            display: true,
            ticks: {
              precision: 0,
              font: {
                size: 15,
                family: 'Monaco'
              }
            }
          }
        }
      }
    });
  }
}
