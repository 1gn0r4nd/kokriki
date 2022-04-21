//https://moonriver.api.onfinality.io/public
//https://rpc.moonriver.moonbeam.network
//wss://moonriver.api.onfinality.io/public-ws
//wss://wss.moonriver.moonbeam.network
//https://docs.metamask.io/guide/ethereum-provider.html#methods
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { EVMCompatibleChain } from "@/models/EVMCompatibleChain";
import { ProviderRpcError } from "@/models/ProviderRpcError";
import { ethers } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";
import { Network } from "@ethersproject/networks";

export interface MetamaskState {
  isUpdating: boolean;
  selected_chain_id: number;
  currentAccount: string;
  accountChangedSubscribers: AccountChangedSubscriber[];
}

export interface AccountChangedSubscriber {
  refresh(account: string): void;
}
export interface ConnectInfo {
  chainId: string;
}

@Module({
  name: "Metamask",
  namespaced: true,
  stateFactory: true,
})
export default class Metamask extends VuexModule implements MetamaskState {
  //find more here https://chainlist.org/
  evm_compatible_chains: EVMCompatibleChain[] = [
    {
      chainName: "Ethereum Mainnet",
      chain_hexid: "0x1",
      chainId: 1,
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
      block_explorer_url: ["https://etherscan.io"],
      rpcUrls: [],
    },
    {
      chainName: "Moonriver",
      chain_hexid: "0x505",
      chainId: 1285,
      nativeCurrency: {
        name: "Moonriver",
        symbol: "MOVR",
        decimals: 18,
      },
      block_explorer_url: ["https://moonriver.subscan.io/"],
      rpcUrls: [],
    },
    {
      chainName: "Avalanche Mainnet",
      chain_hexid: "0x505",
      chainId: 43114,
      nativeCurrency: {
        name: "Avalanche",
        symbol: "AVAX",
        decimals: 18,
      },
      block_explorer_url: ["https://cchain.explorer.avax.network/"],
      rpcUrls: [],
    },
    {
      chainName: "Binance Smart Chain",
      chain_hexid: "0x505",
      chainId: 56,
      nativeCurrency: {
        name: "Binance Coin",
        symbol: "BNB",
        decimals: 18,
      },
      block_explorer_url: ["https://bscscan.com"],
      rpcUrls: [],
    },
    {
      chainName: "Fantom",
      chain_hexid: "0x505",
      chainId: 250,
      nativeCurrency: {
        name: "FTM",
        symbol: "FTM",
        decimals: 18,
      },
      block_explorer_url: ["https://ftmscan.com"],
      rpcUrls: [],
    },
    {
      chainName: "Arbitrum",
      chain_hexid: "0x505",
      chainId: 42161,
      nativeCurrency: {
        name: "ARB",
        symbol: "ARB",
        decimals: 18,
      },
      block_explorer_url: ["https://arbiscan.io"],
      rpcUrls: [],
    },
    {
      chainName: "Matic",
      chain_hexid: "0x505",
      chainId: 137,
      nativeCurrency: {
        name: "Polygon",
        symbol: "MATIC",
        decimals: 18,
      },
      block_explorer_url: ["https://polygonscan.com"],
      rpcUrls: [],
    },
    {
      chainName: "Cronos Mainnet",
      chain_hexid: "0x505",
      chainId: 25,
      nativeCurrency: {
        name: "CRO",
        symbol: "CRO",
        decimals: 18,
      },
      block_explorer_url: ["https://cronos.crypto.org/explorer/"],
      rpcUrls: [],
    },
  ];
  isUpdating = false;
  selected_chain_id = 0;
  currentAccount = "";
  accountChangedSubscribers: AccountChangedSubscriber[] = [];

  @Mutation
  CHANGE_IS_UPDATING(status: boolean): void {
    this.isUpdating = status;
  }

  @Mutation
  SET_NETWORK_CHAIN_ID(chain_id: number): void {
    // const searchIndex = this.evm_compatible_chains.findIndex(
    //   (chain) => chain.chainId == chainId
    // );
    // this.selected_chain = this.evm_compatible_chains[searchIndex];
    this.selected_chain_id = chain_id;
  }

  @Mutation
  ADD_SUBSCRIBER(subscriber: AccountChangedSubscriber): void {
    this.accountChangedSubscribers.push(subscriber);
  }

  @Mutation
  SET_CURRENT_ACCOUNT(account: string): void {
    this.currentAccount = account;
    //tell all components to refresh
    this.accountChangedSubscribers.forEach(
      (subscriber: AccountChangedSubscriber) => {
        subscriber.refresh(this.currentAccount);
      }
    );
  }

  @Action
  is_metamask_installed(): boolean {
    return window.ethereum && window.ethereum.isMetaMask;
  }
  //async getStatus(): Promise<minecraft_server_status> {
  @Action
  get_selected_network(provider: Provider): number {
    if (!this.isUpdating) {
      this.CHANGE_IS_UPDATING(true);
      // window.ethereum
      // .request({
      //   method: "wallet_switchEthereumChain",
      //   params: [{ chainId: `0x${chainId.toString(16)}` }],
      // })
      provider
        .getNetwork()
        .then((response: Network) => {
          this.SET_NETWORK_CHAIN_ID(response.chainId);
        })
        .catch((error: Error) => {
          console.error(error);
        })
        .finally(() => {
          console.log("provider.getNetwork done");
        });
    }
    return this.selected_chain_id;
  }

  @Action
  get_wallet_address(): string {
    window.ethereum
      .request({ method: "eth_accounts" })
      .then((response: Array<string>) => {
        if (response.length > 0) {
          this.SET_CURRENT_ACCOUNT(response[0]);
        }
      })
      .catch((error: ProviderRpcError) => {
        console.error(error);
      })
      .finally(() => {
        //alert("done");
      });
    return this.currentAccount;
  }
  @Action
  setup_metamask(): void {
    console.info("function: setup_metamask");
    //check if metamask is installed.
    this.is_metamask_installed();
    //maybe ask user to install metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.get_selected_network(provider);
    //const signer = provider.getSigner()
    //get the wallet address
    this.get_wallet_address();
    //When the user changes accounts do stuff
    //window.ethereum.on('accountsChanged', handler: (accounts: Array<string>) => void);
    window.ethereum.on("accountsChanged", (accounts: Array<string>) => {
      console.log(`accountsChanged? ${accounts.toString()}`);
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
    });
    //When the user changes chains do stuff
    //ethereum.on('chainChanged', handler: (chainId: string) => void);
    window.ethereum.on("chainChanged", (chainId: number) => {
      console.log(`chainChanged? ${chainId}`);
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      window.location.reload();
    });
    window.ethereum.on("disconnect", (error: ProviderRpcError) => {
      console.log(`disconnect? ${error}`);
    });
    //ethereum.on('message', handler: (message: ProviderMessage) => void);
    window.ethereum.on("connect", (connectInfo: ConnectInfo) => {
      console.log("connect?");
      console.log(connectInfo.toString());
    });
    //window.ethereum.on('disconnect', handler: (error: ProviderRpcError) => void);
    //this.get_selected_network();
    //this.get_addresses();
    console.info("end function: setup_metamask");
  }

  @Action
  desetup_metamask(): void {
    //window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    //window.ethereum.removeListener('chainChanged', handleAccountsChanged);
  }

  @Action
  add_chain(chain_info: EVMCompatibleChain): void {
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      chain_info,
    });
  }

  @Action
  switch_to_chain(chainId: number): void {
    console.info("function: switch_to_chain");
    window.ethereum
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
      .then((response: string[]) => {
        console.log(response[0]);
      })
      .catch((error: ProviderRpcError) => {
        if (error.code === 4902) {
          console.log("add the chain to metamask)");
          const searchIndex = this.evm_compatible_chains.findIndex(
            (chain) => chain.chainId == 1285
          );
          const chain_to_add = this.evm_compatible_chains[searchIndex];
          this.add_chain(chain_to_add);
        }
        alert(error);
      })
      .finally(() => {
        //alert("done");
      });
  }

  @Action
  onClickConnect(): void {
    console.info("function: onClickConnect");
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((addresses: string[]) => {
        console.log(addresses);
        //this.handleAccountsChanged(response);
        this.handleAccountsChanged(addresses);
      })
      .catch((error: ProviderRpcError) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.");
        } else {
          console.error(error);
        }
      });
    console.info("function: onClickConnect end");
    // this.get_selected_network();
    //console.info("this.selected_chain.chainId: " + this.selected_chain.chainId);
    // if (this.selected_chain.chainId == 1285) {
    //   // we got a movr chain
    //   console.info("we're on movr");
    // } else {
    //   this.switch_to_chain(1285);
    // }
    // if (this.provider != null) {
    //   const signer = this.provider.getSigner();
    //   signer.connect(this.provider);
    //   signer
    //     .getAddress()
    //     .then((response: string[]) => {
    //       alert(response);
    //     })
    //     .catch((error: ProviderRpcError) => {
    //       alert(error);
    //     })
    //     .finally(() => {
    //       //alert("done");
    //     });
    //   //alert(signer);
    //   // Define Provider
    //   //const provider = new ethers.providers.StaticJsonRpcProvider(providerURL, {
    //   //    chainId: 1285,
    //   // chainId: 0x505
    //   //    name: 'moonriver'
    //   //});
    //   // const account_from = {
    //   //   privateKey: 'YOUR-PRIVATE-KEY-HERE',
    //   //   address: 'PUBLIC-ADDRESS-OF-PK-HERE',
    //   // };
    //   //const addressTo = 'ADDRESS-TO-HERE'; // Change addressTo
    //   //   setInteractionMode("eager");
    // } else {
    //   this.setup_metamask();
    // }
    //new ethers.providers.Web3Provider(window.ethereum);
  }

  // const providerRPC = {
  //     development: "http://localhost:9933",
  //     moonbase: "https://rpc.api.moonbase.moonbeam.network",
  //     moonriver: "https://rpc.moonriver.moonbeam.network",
  //   };

  @Action
  disconnect(): void {
    //this.SET_PROVIDER(null);
    // window.ethereum
    //   .request({
    //     method: "wallet_requestPermissions",
    //     params: [
    //       {
    //         eth_accounts: {},
    //       },
    //     ],
    //   })
    //   .then((response: any) => {
    //     console.log(response);
    //   })
    //   .catch((error: ProviderRpcError) => {
    //     if (error.code === 4001) {
    //       // EIP-1193 userRejectedRequest error
    //       // If this happens, the user rejected the connection request.
    //       console.log("Please connect to MetaMask.");
    //     } else {
    //       console.error(error);
    //     }
    //   });
  }
  findChain(chainId: number): EVMCompatibleChain {
    const searchIndex = this.evm_compatible_chains.findIndex(
      (chain) => chain.chainId == chainId
    );
    return this.evm_compatible_chains[searchIndex];
  }
  @Action
  handleAccountsChanged(accounts: string[]): void {
    console.log("function: handleAccountsChanged" + accounts);
    window.ethereum
      .request({ method: "eth_accounts" })
      .then((response: string[]) => {
        console.info("response");
        console.info(response);
      })
      .catch((error: ProviderRpcError) => {
        console.error(error);
      })
      .finally(() => {
        //alert("done");
      });
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== this.currentAccount) {
      this.SET_CURRENT_ACCOUNT(accounts[0]);
      console.info("Account changed. ");
      // Do any other work!
    }
  }

  @Action getBalance(params: {tokenContractAddress: string, chain_id: number, abi: string[], wallet_address: string}): string {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(params.tokenContractAddress, params.abi, provider);
    let result = "-1";
    // console.log(`this wallet_address: ${params.wallet_address}`);
    // console.log(`this tokenContractAddress: ${params.tokenContractAddress}`);
    // console.log(`this abi: ${params.abi}`);
    //TODO: check if we are on correct chain
    //chain_id
    contract.balanceOf(params.wallet_address)
      .then((response: string) => {
      console.log(response);
      console.log(ethers.utils.formatEther(response));
      console.log(typeof (ethers.utils.formatEther(response)));
      result = ethers.utils.formatEther(response);
    })
    .catch((error: any) => {
        //reject(error)
        console.log(error);
      })
      .finally(() => {
        console.log('finally');
      });
    return result;
  }

  // //async getStatus(): Promise<minecraft_server_status> {
  // @Action
  // get_addresses(): void {
  //   if (!this.isUpdating) {
  //     this.CHANGE_IS_UPDATING(true);
  //     window.ethereum
  //       .request({ method: "eth_requestAccounts" })
  //       .then((response: string[]) => {
  //         console.log(response[0]);
  //       })
  //       .catch((error: ProviderRpcError) => {
  //         alert(error.message);
  //       })
  //       .finally(() => {
  //         //alert("done");
  //       });
  //   }
  // }
  @Action
  add_account_changed_subscriber(subscriber: AccountChangedSubscriber): void {
    this.ADD_SUBSCRIBER(subscriber);
  }
}
