import { ethers } from "ethers";
// import { VuexModule } from "vuex-module-decorators";
export class ERC20Resource{
  tokenContractAddress: string;
  networkId: number;
  abi: string[];
  constructor(
    tokenContractAddress: string,
    networkId: number,
    abi: string[],
  ) {
    this.tokenContractAddress = tokenContractAddress;
    this.networkId = networkId;
    this.abi = abi;

  }

  // getBalance(wallet_address: string,component: any){
    // component.$modules.metamask.getBalance({
    //   tokenContractAddress: this.tokenContractAddress,
    //   chain_id: this.networkId,
    //   abi: this.abi,
    //   wallet_address: wallet_address
    // })
    // const contract = new ethers.Contract(this.tokenContractAddress, this.abi, provider);
    // contract.balanceOf(wallet_address)
    //   .then((response: string) => {
    //   console.log(response);
    //   console.log(ethers.utils.formatEther(response));
    //   console.log(typeof (ethers.utils.formatEther(response)));
    // })
    // .catch((error: any) => {
    //     //reject(error)
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     console.log('finally');
    //   });
  // }
}