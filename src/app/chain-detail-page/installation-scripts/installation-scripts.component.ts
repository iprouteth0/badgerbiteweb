import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Chain } from "../../model/chain";
import { ChainCheatSheet } from "../../model/chainCheatSheet";
import { HighlightService } from "../../service/highlight.service";
import { HttpClient } from "@angular/common/http";
import { ChainService } from "../../service/chain.service";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-installation-data',
  templateUrl: './installation-scripts.component.html',
  styleUrls: ['./installation-scripts.component.css']
})
export class InstallationScriptsComponent implements OnInit {

  automaticScriptUrl?: string;
  manualScriptContent?: string;
  testnetInstructionsContent?: string;
  chain?: Chain;
  SaveChain?: ChainCheatSheet;
  highlighted = false;

  constructor(private highlightService: HighlightService,
              private http: HttpClient,
              public chainService: ChainService,
              @Inject(DOCUMENT) private document: Document,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.chainService.activeChain) {
      let activeChain = this.chainService.activeChain
      let savedChainInfo = JSON.parse(localStorage.getItem(activeChain.chainId) || '{}');

      this.SaveChain = new ChainCheatSheet(
        activeChain.id,
        activeChain.chainId,
        activeChain.denomName,
        this.chainService.getChainBinaryName(activeChain),
        activeChain.homeDirectoryName,
        savedChainInfo.keyName || 'wallet',
        savedChainInfo.gas || 0.1,
        savedChainInfo?.moniker! || '',
        savedChainInfo.identity || 'DE08041434EBB322', // BadgerBite keybase
        savedChainInfo.details || 'The Best Validator in Town',
        savedChainInfo.proposalId || 1,
        savedChainInfo.toValoperAddress || '',
        savedChainInfo.toWalletAddress || '',
        savedChainInfo.portIncrement || 0,
        activeChain.serviceName,
        savedChainInfo.commissionRate || "0.10",
        savedChainInfo.commissionMaxRate || "0.20",
        savedChainInfo.commissionMaxChangeRate || "0.01",
        activeChain.githubRepoName || '',
        savedChainInfo.amount || 1000000,
        savedChainInfo.indexer || 'kv',
        savedChainInfo.pruning || 'custom',
        savedChainInfo.pruningKeepRecent || 100,
        savedChainInfo.pruningKeepEvery || 0,
        savedChainInfo.pruningInterval || 10,
        savedChainInfo.txId || '',
      );
    }
  }

  saveParam(paramName: String): void {
    let paramKey = paramName as keyof ChainCheatSheet;
    let value = this.SaveChain?.[paramKey];
    let chainId = this.SaveChain?.chainId || 'default';

    let savedChainInfo = JSON.parse(localStorage.getItem(chainId) || '{}');
    savedChainInfo[paramKey] = value;
    localStorage.setItem(chainId, JSON.stringify(savedChainInfo))
  }

  ngAfterViewInit(): void {
    this.chain = this.chainService.activeChain;
    if (this.chain) {

      const chainName = this.chain.id.toLowerCase();
      const chainId = this.chain.chainId;
      const Directory = this.chain.homeDirectoryName;
      const binaryName = this.chainService.getChainBinaryName(this.chain);
      const Denom = this.chain.denomName;
      const snapRPC = this.chain.statesyncServer;
      const Github = this.chain.github;
      const GithubRepo = this.chain.githubRepoName!;
      const version = this.chain.version!;
      const Seeds = this.chain.seeds!;
      const Peers = this.chain.peers!;
      const Genesis = this.chain.genesis!;
      const Make = this.chain.make!;

      this.automaticScriptUrl = `https://raw.githubusercontent.com/BadgerbiteInfo/scripts/main/${chainName}/manual.sh`
      this.cdr.detectChanges();

      this.http.get(this.automaticScriptUrl, {responseType: 'text'}).subscribe(data => {

        const trimmedAutomationScriptContent = data
          .split("# Manual Installation Script")[1]
          .split("printLine")[0]
          .split("\n")
          .filter(line => !line.includes("print"))
          .filter(line => !line.includes("bash"))
          .join('\n')
          .replace(new RegExp('<BINARY>', 'g'), binaryName)
          .replace(new RegExp('<DIRECTORY>', 'g'), "~/" + Directory)
          .replace(new RegExp('<CHAINID>', 'g'), chainId)
          .replace(new RegExp('<DENOM>', 'g'), Denom)
          .replace(new RegExp('<SNAP_RPC>', 'g'), snapRPC)
          .replace(new RegExp('<GITHUB>', 'g'), Github)
          .replace(new RegExp('<GITHUB REPO>', 'g'), GithubRepo)
          .replace(new RegExp('<VERSION>', 'g'), version)
          .replace(new RegExp('<SEEDS>', 'g'), Seeds)     
          .replace(new RegExp('<PEERS>', 'g'), Peers)
          .replace(new RegExp('<GENESIS>', 'g'), Genesis)
          .replace(new RegExp('SEEDS=""', 'g'),"")  
          .replace(new RegExp('PEERS=""', 'g'),"")  
          .replace(new RegExp('<MAKE>', 'g'),Make)          
          .trim()

          .replace("\n\n\n", "\n\n")
          .replace("\n\n\n", "\n\n"); // we need to do this twice

        this.manualScriptContent = "#!/bin/bash\n\n"
          + trimmedAutomationScriptContent
          + `\n\nsudo journalctl -u ${binaryName} -f --no-hostname -o cat`;
        this.highlightService.highlightAllUnder(document.getElementById('manual'));
      });

      if (this.chain.isTestnet) {
        const testnetInstructionsUrl = `https://raw.githubusercontent.com/BadgerbiteInfo/scripts/main/${chainName}/testnet-instructions.sh`
        this.http.get(testnetInstructionsUrl, {responseType: 'text'}).subscribe(data => {
          this.testnetInstructionsContent = data?.trim() || 'TBD';
          this.highlightService.highlightAllUnderElementId('create-validator');
        });
      }
      this.highlightService.highlightAll(this.highlightTaskLink.bind(this));
    }
  }
  handleCopyClick(event: Event): void {
    let htmlElement = (event.target as HTMLInputElement);
    htmlElement.innerText = 'Copied!';
    setTimeout(function () {
      htmlElement.innerText = 'Copy';
    }, 5000);
    let commandText = (event.target as HTMLInputElement).closest<HTMLInputElement>('.copy-button-container')?.querySelector('.command')?.innerHTML || '';
    commandText = this.unEscape(commandText);
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = commandText;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  unEscape(htmlStr: string): string {
    htmlStr = htmlStr.replace(/<br (.*)>/g, "");
    htmlStr = htmlStr.replace(/<\/pre>/g, "");
    htmlStr = htmlStr.replace(/<pre (.*)>/g, "");
    htmlStr = htmlStr.replace(/&lt;/g, "<");
    htmlStr = htmlStr.replace(/&gt;/g, ">");
    htmlStr = htmlStr.replace(/&quot;/g, "\"");
    htmlStr = htmlStr.replace(/&#39;/g, "\'");
    htmlStr = htmlStr.replace(/&amp;/g, "&");
    htmlStr = htmlStr.replace(/&#123;/g, "{");
    htmlStr = htmlStr.replace(/&#125;/g, "}");
    return htmlStr;
  }
  highlightTaskLink(): void {
    const tasksLinkElement = document.getElementById('tasks-link');
    if (tasksLinkElement) {
      tasksLinkElement.innerHTML = `<a href="${this.chain?.testnetTasksLink}" target="_blank">${this.chain?.testnetTasksLink}</a>`;
    }
  }
}
