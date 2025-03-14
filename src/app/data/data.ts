import { Chain } from "../model/chain";

export const CHAINS: Chain[] = [
  {
    id: "odin",
    chainName: " Odin",
    chainId: "odin-mainnet-freya",
    logo: "odin.svg",
    snapshotServer: "https://badgerbite.info/snapshots",
    SnapshotProvider: "Mercury Nodes",
    rpcServer: "https://node.odin-freya-website.odinprotocol.io/mainnet/a/",
    statesyncServer: "http://34.79.179.216:26657",
    restServer: "https://node.odin-freya-website.odinprotocol.io/mainnet/a/api",  
    rpcPeer: "0165cd0d60549a37abb00b6acc8227a54609c648@34.79.179.216:26656",
    serviceName: "odind",
    version: "v0.6.0",
    seeds: "4529fc24a87ff5ab105970f425ced7a6c79f0b8f@odin-seed-01.mercury-nodes.net:29536,c8ee9f66163f0c1220c586eab1a2a57f6381357f@odin.seed.rhinostake.com:16658",
    peers:"9d16b1ce74a34b869d69ad5fe34eaca614a36ecd@35.241.238.207:26656,02e905f49e1b869f55ad010979931b542302a9e6@35.241.221.154:26656,4847c79f1601d24d3605278a0183d416a99aa093@34.140.252.7:26656,0165cd0d60549a37abb00b6acc8227a54609c648@34.79.179.216:26656",
    genesis: "https://raw.githubusercontent.com/ODIN-PROTOCOL/networks/master/mainnets/odin-mainnet-freya/genesis.json",
    make: "all",
    homeDirectoryName: ".odin",
    twitter: "https://twitter.com/odinprotocol",
    github: "https://github.com/ODIN-PROTOCOL/",
    globe: "https://https://odinprotocol.io/",
    medium: "https://odinprotocol.medium.com",
    discord: "https://discord.gg/cUXKyRq",
    blockExplorer: "https://ping.pub/odin",
    coingekoCoinId: "odin-protocol",
    validatorUrl: "https://ping.pub/odin/staking/odinvaloper1s009mue6fg6usnd8dfyvtvcckndtxsxjd5shs7",
    Valoper: "odinvaloper1s009mue6fg6usnd8dfyvtvcckndtxsxjd5shs7",
    denomName: "loki",
    denomPow: 6,
    isProjectSupportUs: true,
    newWayUnsafeResetAll: true,
    DexScreener: "https://api.dexscreener.com/latest/dex/pairs/osmosis/777",
    githubRepoName: 'odin-core'
  },
  {
    id: "sentinel",
    chainName: "Sentinel",
    chainId: "sentinelhub-2",
    logo: "sentinel.svg",
    snapshotServer: "https://snapshot.notional.ventures/sentinel",
    SnapshotProvider: "Notional Ventures",
    rpcServer: "https://rpc.sentinel1.badgerbite.xyz",
    statesyncServer: "https://rpc-sentinel.keplr.app:443",
    restServer: "https://lcd.sentinel.co", 
    rpcPeer: "05fe2a7847fd27345250915fd06752c424f40651@85.222.234.135:26656",
    serviceName: "sentinelhub",
    version: "v0.9.2",
    seeds: "",
    peers:"05fe2a7847fd27345250915fd06752c424f40651@85.222.234.135:26656,387027e3b1180d3a619cbbf3462704a490785963@54.176.90.228:26656,63bd9cfce0f0d274aad5b166dd06d829021aec43@121.78.247.243:56656,855807cc6a919c22ec943050ebb5c80b23724ed0@3.239.11.246:26656,8caefbf8f4318ecc93f2c901cf11470e4a16c818@161.97.135.122:26656,9174af5f16f74660cccf49f893d243949af45f7f@54.177.29.46:26656,9fa528bd2b9e7c80724a1d8a4e1a2a8a83e7d123@142.93.72.221:26656,a77f6a094578dad899e2f40e0626b4c6d4705311@3.36.165.232:26656,bd45a11390d16d128a9eeea3935b53d7a1a3c120@15.236.127.69:26656,cdb8dd7628460a546ce1594ca0bc0c20366514cf@34.72.64.178:26656,d1efceccb04ded9a604e5235f76da86872157d68@161.97.149.223:26656,e00b23444cc8dbb353d5faa765ab36cfc0116b57@83.60.98.134:28685,e5ee89bd4fc371c6a0e66d2b8daefd891b6b87b5@157.90.117.58:26656,f7ceb735606f90df7eb6cd987641876955b6e325@46.4.55.150:36656",
    genesis: "https://raw.githubusercontent.com/sentinel-official/networks/main/sentinelhub-2/genesis.zip",
    make: "install",
    homeDirectoryName: ".sentinelhub",
    twitter: "https://twitter.com/Sentinel_co",
    github: "https://github.com/sentinel-official/",
    globe: "https://sentinel.co/",
    medium: "https://sentinel.medium.com/",
    discord: "https://discord.gg/mmAA8qF",
    blockExplorer: "https://ping.pub//sentinel",
    coingekoCoinId: "sentinel",
    validatorUrl: "https://ping.pub/sentinel/staking/sentvaloper16yg44hae44lcdexmmk7wpaphny0ahmqf6zevq5",
    Valoper: "sentvaloper16yg44hae44lcdexmmk7wpaphny0ahmqf6zevq5",
    projectOverview: "Individuals from all over the world can now monetize on their unused bandwidth by becoming a 'Bandwidth Miner' on the Sentinel p2p bandwidth sharing network. The integration of Sentinel dVPN nodes with hardware devices such as routers, allow for users to effortlessly host Sentinel nodes from their home, allowing for the creation of a robust residential IP marketplace.",
    denomName: "udvpn",
    denomPow: 6,
    isProjectSupportUs: true,
    DexScreener: "https://api.dexscreener.com/latest/dex/pairs/osmosis/5",
    githubRepoName: 'hub'
  },
  {
    id: "shentu",
    chainName: "Shentu",
    chainId: "shentu-2.2",
    logo: "shentu.svg",
    apiChainId: "shentu",
    snapshotServer: "https://www.polkachu.com/tendermint_snapshots/certik",
    SnapshotProvider: "Polkachu",
    rpcServer: "https://shenturpc.noopsbycertik.com/",
    statesyncServer: "https://shenturpc.noopsbycertik.com:443",
    restServer: "https://certik-api.polkachu.com", 
    rpcPeer: "3fddc0e55801f89f27a1644116e9ddb16a951e80@3.80.87.219:26656",
    serviceName: "certik",
    version: "v2.4.0",
    seeds: "3fddc0e55801f89f27a1644116e9ddb16a951e80@3.80.87.219:26656,4814cb067fe0aef705c4d304f0caa2362b7c4246@54.167.122.47:26656,f42be55f76b7d3425f493e54d043e65bfc6f43cb@54.227.66.150:26656",
    peers:"",
    genesis: "https://github.com/ShentuChain/mainnet/raw/main/shentu-2.2/genesis.json",
    make: "install",
    homeDirectoryName: ".certik",
    twitter: "https://twitter.com/ShentuChain",
    github: "https://github.com/ShentuChain/",
    globe: "https://www.shentu.technology/",
    medium: "https://www.shentu.technology/#",
    discord: "https://discord.gg/7D62sHx6aZ",
    blockExplorer: "https://ping.pub/shentu",
    validatorUrl: "https://ping.pub/shentu/staking/certikvaloper16kctxuen3x2avvjj2mdwsl6g8n7d4vjkqyd762",
    Valoper: "certikvaloper16kctxuen3x2avvjj2mdwsl6g8n7d4vjkqyd762",
    projectOverview: "The mission of the Shentu Chain is to empower people to trust in the blockchain. By utilizing cutting-edge technologies and techniques to prove trustworthiness in the underlying systems, the Shentu Chain aims to raise the standards of security and trustworthiness in the blockchain.",
    denomName: "uctk",
    denomPow: 6,
    coingekoCoinId: "certik",
    isProjectSupportUs: false,
    DexScreener: "https://api.dexscreener.com/latest/dex/pairs/energi/0xc59f04e41b9a6d0d2ee5a1235135308989524ada",
    githubRepoName: 'shentu'
  },
  {
    id: "jackal",
    chainName: "Jackal",
    chainId: "jackal-1",
    logo: "jackal.svg",
    snapshotServer: "https://www.polkachu.com/tendermint_snapshots/jackal",
    SnapshotProvider: "Polkachu",
    rpcServer: "https://rpc.cosmos.directory/jackal",
    statesyncServer: "https://rpc.jackalprotocol.com:443",
    restServer: "https://api.jackalprotocol.com/", 
    rpcPeer: "fda1f87472c9c2ee89a0ba36a9a9cc38f96e283a@198.244.212.27:26656",
    serviceName: "canined",
    version: "v1.1.2-hotfix",
    seeds: "	fda1f87472c9c2ee89a0ba36a9a9cc38f96e283a@198.244.212.27:26656,20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:17556,ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:17556",
    peers:"fda1f87472c9c2ee89a0ba36a9a9cc38f96e283a@198.244.212.27:26656,d8203bad2c26883c7fb8be1d259a098a273f0840@135.181.20.44:2506,53300f221a72ba385f86ca42709a46413d47f5b0@pve7.badgerbite.io:36657,fa0d8085abaf34d9a2349bef0b19dff6f89013b5@209.34.206.38:26656,0ab9ec918cd36a28be1fcf538f7f76ede2b81659@89.58.38.59:26656,2af06d39d68345d41cd16182e3472d96c5a0150b@136.244.29.116:27656",
    genesis: "https://github.com/JackalLabs/jackal-chain-assets/blob/main/testnet/genesis.json",
    make: "install",
    homeDirectoryName: ".jkl",
    twitter: "https://twitter.com/Jackal_Protocol",
    github: "https://github.com/JackalLabs/",
    globe: "https://jackalprotocol.com/",
    medium: "https://jackaldao.medium.com/",
    discord: "https://discord.com/invite/5GKym3p6rj",
    blockExplorer: "https://ping.pub/jackal",
    validatorUrl: "https://ping.pub/jackal/staking/jklvaloper18qtxhdm3s5rxeau2ddwact6wczv984zs43t635",
    Valoper: "jklvaloper18qtxhdm3s5rxeau2ddwact6wczv984zs43t635",
    denomName: "ujkl",
    coingekoCoinId: "jackal-protocol",
    denomPow: 6,
    newWayUnsafeResetAll: true,
    isProjectSupportUs: true,
    DexScreener: "https://api.dexscreener.com/latest/dex/pairs/osmosis/832",
    githubRepoName: 'JackalLabs'
  },
]
