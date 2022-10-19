export class Chain {
  id: string;
  chainName: string;
  chainId: string;
  logo: string;
  snapshotServer: string;
  statesyncServer: string;
  rpcServer: string;
  restServer?: string;
  rpcPeer: string;
  serviceName: string;
  binaryName?: string;
  homeDirectoryName: string;
  seeds?: string;
  peers?: string;
  twitter: any;
  github: string;
  globe: string;
  medium?: string;
  discord?: string;
  telegram?: string;
  version?: string;
  genesis?: string;
  make?: string;
  blockExplorer?: string;
  coingekoCoinId?: string;
  validatorUrl?: string;
  projectOverview?: string;
  snapshotDisabled?: boolean;
  stateSyncDisabled?: boolean;
  summaryDisabled?: boolean;
  denomName: string;
  denomPow: number;
  apiChainId?: string;
  stateSyncExtraStep?: string;
  isProjectSupportUs?: boolean;
  newWayUnsafeResetAll?: boolean;
  isTestnet?: boolean;
  hardwareRequirements?: string;
  githubRepoName?: string;
  isArchive?: boolean;
  archiveReason?: string;
  endedAt?: string;
  testnetTasksLink?: string;
  hasWasm?: boolean;
  SnapshotProvider?: string;
  Valoper?: string;
  price?: number;
  staked?: number;
  totalassets?: number;

  constructor(id: string, chainName: string, make: string, statesyncServer: string, genesis: string, version: string, chainId: string, logo:string, snapshotServer: string, rpcServer: string,
              rpcPeer: string, restServer:string, serviceName: string, homeDirectoryName: string, twitter: string, github: string,
              globe: string, denomName: string, denomPow: number) {
    this.id = id;
    this.chainName = chainName;
    this.chainId = chainId;
    this.logo = logo;
    this.snapshotServer = snapshotServer;
    this.rpcServer = rpcServer;
    this.statesyncServer = statesyncServer;
    this.restServer = restServer;
    this.rpcPeer = rpcPeer;
    this.serviceName = serviceName;
    this.homeDirectoryName = homeDirectoryName;
    this.twitter = twitter;
    this.github = github;
    this.globe = globe;
    this.denomName = denomName;
    this.denomPow = denomPow;
    this.version = version;
    this.genesis = genesis;
    this.make = make;
  }
}
