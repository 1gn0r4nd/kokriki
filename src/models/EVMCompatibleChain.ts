export class EVMCompatibleChain {
  chainName: string;
  chain_hexid: string;
  chainId: number;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  block_explorer_url?: string[];

  constructor(chainName: string,
  chain_hexid: string,
  chainId: number,
    nativeCurrency: {
      name: string,
      symbol: string,
      decimals: number,
    },
  rpcUrls: string[],
  block_explorer_url?: string[],
  ){
    this.chainName = chainName;
    this.chain_hexid = chain_hexid;
    this.chainId = chainId
    this.nativeCurrency = nativeCurrency
    this.rpcUrls = rpcUrls;
    this.block_explorer_url = block_explorer_url;
  }


}