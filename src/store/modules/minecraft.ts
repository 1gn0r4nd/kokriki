import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import axios from "axios/index";
import { ethers } from "ethers";
import { ERC20Resource } from "@/models/ERC20Resource";

// import { AuthState } from '@aws-amplify/ui-components'
// import { API, Auth } from "aws-amplify";
// import { CognitoUser } from "@aws-amplify/auth";
// import { CognitoUserSession } from "amazon-cognito-identity-js";

export interface MinecraftState {
  servers: minecraft_server[];
  chaos_server_status: minecraft_server_status;
  carnage_server_status: minecraft_server_status;
  canary_server_status: minecraft_server_status;
  isUpdating: boolean;
  experience: number;
  gold: number;
  iron: number;
  cobblestone: number;
  wood: number;
}

export interface minecraft_server_status {
  max_players: number;
  current_players: number;
  server_name: string;
  protocol: number;
  last_updated: number;
  duration: number;
  online: boolean;
  status: string;
  //ping
  players: {
    name: string;
    id: string;
  }[];
}

export interface minecraft_server {
  name: string;
  host: string;
  port: number | null;
}

@Module({
  name: "Minecraft",
  namespaced: true,
  stateFactory: true,
})
export default class Minecraft extends VuexModule implements MinecraftState {
  servers = [
    {
      name: "carnage",
      host: "carnage.moonsama.com",
      port: 25000,
    },
    {
      name: "canary",
      host: "canary.moonsama.com",
      port: 26000,
    },
    {
      name: "chaos",
      host: "chaos.moonsama.com",
      port: 27000,
    },
    {
      name: "seasonal",
      host: "season.moonsama.com",
      port: 28000,
    },
  ];
  api_key = "I51W6JMETFZRF8HQ45XT1ZMDIC53GTEGUV";
  tokens = [
    {
      text: "Experience",
      icon: "xp",
      token_id: "0x138a90f246abb23a157da7a1d9db19dcf1691362",
      name: "Alpha Experience",
      type: "erc20",
    },
    {
      text: "Gold",
      icon: "gold",
      token_id: "0x088fe6e0e1caca1ee45e8de96abe79e4e139f4ab",
      name: "Alpha Gold",
      type: "erc20",
    },
    {
      text: "Iron",
      icon: "iron",
      token_id: "0x9e403aa2dfef9ba2a2b82286d13864a64d90bf36",
      name: "Alpha Iron",
      type: "erc20",
    },
    {
      text: "Cobblestone",
      icon: "cobble",
      token_id: "0x77709c42d43f2e53c24b8fa623a207abdc89857c",
      name: "Alpha Stone",
      type: "erc20",
    },
    {
      text: "Wood",
      icon: "wood",
      token_id: "0x8ce2bdc6e0319cea87337d027382f09b715c9601",
      name: "Alpha Wood",
      type: "erc20",
    },
    {
      text: "aGrain",
      icon: "grain",
      token_id: "0xf93e1d54c939eca89240ff3a4311a490306f0e2d",
      name: "Alpha Grain",
      type: "erc20",
    },
  ];
  // {
  //   token_id: "0xb9b986ddbe741781aec6a7c8e5337e19f7898ac9",
  //   name: "Black Spot",
  //   type: "erc20",
  // },
  // {
  //   token_id: "0x4a436073552044d5f2f49b176853ad3ad473d9d6",
  //   name: "Rome",
  //   type: "erc20",
  // },
  // {
  //   token_id: "0x89f52002e544585b42f8c7cf557609ca4c8ce12a",
  //   name: "Staked Rome",
  //   type: "erc20",
  // },
  // //if sent to 0x3718bc4389cc4d960cedf9ff68e96c731bc8f685 joined campain
  // {
  //   token_id: "0xb6e9e605aa159017173caa6181c522db455f6661",
  //   name: "Damned Pirates Society",
  //   type: "erc721",
  // },
  experience = -1;
  gold = -1;
  iron = -1;
  cobblestone = -1;
  wood = -1;
  chaos_server_status: minecraft_server_status = {
    max_players: 0,
    current_players: 0,
    server_name: "",
    protocol: 0,
    last_updated: 0,
    duration: 0,
    online: false,
    status: "",
    //ping
    players: [],
  };
  carnage_server_status: minecraft_server_status = {
    max_players: 0,
    current_players: 0,
    server_name: "",
    protocol: 0,
    last_updated: 0,
    duration: 0,
    online: false,
    status: "",
    //ping
    players: [],
  };
  canary_server_status: minecraft_server_status = {
    max_players: 0,
    current_players: 0,
    server_name: "",
    protocol: 0,
    last_updated: 0,
    duration: 0,
    online: false,
    status: "",
    //ping
    players: [],
  };
  isUpdating = false;

  @Mutation
  CHANGE_IS_UPDATING(status: boolean): void {
    this.isUpdating = status;
  }

  @Mutation
  SET_CHAOS_SERVER_STATUS(server_status: minecraft_server_status): void {
    this.chaos_server_status = server_status;
  }

  @Mutation
  SET_CARNAGE_SERVER_STATUS(server_status: minecraft_server_status): void {
    this.carnage_server_status = server_status;
  }

  @Mutation
  SET_CANARY_SERVER_STATUS(server_status: minecraft_server_status): void {
    this.canary_server_status = server_status;
  }

  @Mutation
  SET_EXPERIENCE_AMOUNT(amount: number): void {
    this.experience = amount;
  }

  @Mutation
  SET_GOLD_AMOUNT(amount: number): void {
    this.gold = amount;
  }

  @Mutation
  SET_IRON_AMOUNT(amount: number): void {
    this.iron = amount;
  }

  @Mutation
  SET_COBBLESTONE_AMOUNT(amount: number): void {
    this.cobblestone = amount;
  }

  @Mutation
  SET_WOOD_AMOUNT(amount: number): void {
    this.wood = amount;
  }

  //async getStatus(): Promise<minecraft_server_status> {
  @Action
  getCanaryStatus(): void {
    if (!this.isUpdating) {
      this.CHANGE_IS_UPDATING(true);
      // const searchIndex = this.servers.findIndex(
      // (server) => server.name == server_name
      // );
      const server_index = 0;
      const selected_server = this.servers[server_index];
      //queryUrl = https://mcapi.us/server/status?ip=${selected_server.host}&port=${selected_server.port}
      //https://mcapi.us/server/status?ip=chaos.moonsama.com&port=27000
      //https://mcapi.xdefcon.com/server/canary.moonsama.com:27000/full/json
      const queryUrl = `https://mcapi.us/server/status?ip=${selected_server.host}&port=${selected_server.port}`;
      //console.log(queryUrl);
      //return new Promise((resolve, reject) => {
      axios
        .get(queryUrl)
        .then((response) => {
          if (response.data.status === "success") {
            this.SET_CANARY_SERVER_STATUS({
              max_players: response.data.players.max,
              current_players: response.data.players.now,
              server_name: response.data.server.name,
              protocol: response.data.server.protocol,
              last_updated: response.data.last_updated,
              duration: response.data.duration,
              online: response.data.online,
              status: response.data.status,
              players: response.data.players.sample,
            });
          }
          //context.commit('retrieveRhOrganizationList', response.data)
          //context.commit('rhOrganisationListChangeLoading', false)
          //resolve(response)
        })
        .catch((error) => {
          //context.commit('rhOrganisationListChangeLoading', false)
          //reject(error)
          console.log(error);
        })
        .finally(() => {
          this.CHANGE_IS_UPDATING(false);
        });
      //https://mcapi.us/server/status?ip=chaos.moonsama.com&port=27000
      //https://mcapi.xdefcon.com/server/canary.moonsama.com:27000/full/json
      // API.get("roodgeelblauw-api", "/api/v1/balance", myInit)
      //   .then(response => {
      //     console.log("success");
      //     console.log(response);
      //     //this.SET_BALANCE(response.data);
      //   })
    }
  }

  @Action
  getCarnageStatus(): void {
    if (!this.isUpdating) {
      this.CHANGE_IS_UPDATING(true);
      // const searchIndex = this.servers.findIndex(
      // (server) => server.name == server_name
      // );
      const server_index = 2;
      const selected_server = this.servers[server_index];
      //queryUrl = https://mcapi.us/server/status?ip=${selected_server.host}&port=${selected_server.port}
      //https://mcapi.us/server/status?ip=chaos.moonsama.com&port=27000
      //https://mcapi.xdefcon.com/server/canary.moonsama.com:27000/full/json
      const queryUrl = `https://mcapi.us/server/status?ip=${selected_server.host}&port=${selected_server.port}`;
      console.log(queryUrl);
      //return new Promise((resolve, reject) => {
      axios
        .get(queryUrl)
        .then((response) => {
          if (response.data.status === "success") {
            this.SET_CARNAGE_SERVER_STATUS({
              max_players: response.data.players.max,
              current_players: response.data.players.now,
              server_name: response.data.server.name,
              protocol: response.data.server.protocol,
              last_updated: response.data.last_updated,
              duration: response.data.duration,
              online: response.data.online,
              status: response.data.status,
              players: response.data.players.sample,
            });
            console.log(response);
          }
          //context.commit('retrieveRhOrganizationList', response.data)
          //context.commit('rhOrganisationListChangeLoading', false)
          //resolve(response)
        })
        .catch((error) => {
          //context.commit('rhOrganisationListChangeLoading', false)
          //reject(error)
          console.log(error);
        })
        .finally(() => {
          this.CHANGE_IS_UPDATING(false);
        });
      //https://mcapi.us/server/status?ip=chaos.moonsama.com&port=27000
      //https://mcapi.xdefcon.com/server/canary.moonsama.com:27000/full/json
      // API.get("roodgeelblauw-api", "/api/v1/balance", myInit)
      //   .then(response => {
      //     console.log("success");
      //     console.log(response);
      //     //this.SET_BALANCE(response.data);
      //   })
    }
  }

  @Action
  getChaosStatus(): void {
    if (!this.isUpdating) {
      this.CHANGE_IS_UPDATING(true);
      // const searchIndex = this.servers.findIndex(
      // (server) => server.name == server_name
      // );
      const server_index = 1;
      const selected_server = this.servers[server_index];
      //queryUrl = https://mcapi.us/server/status?ip=${selected_server.host}&port=${selected_server.port}
      //https://mcapi.us/server/status?ip=chaos.moonsama.com&port=27000
      //https://mcapi.xdefcon.com/server/canary.moonsama.com:27000/full/json
      const queryUrl = `https://mcapi.us/server/status?ip=${selected_server.host}&port=${selected_server.port}`;
      //console.log(queryUrl);
      //return new Promise((resolve, reject) => {
      axios
        .get(queryUrl)
        .then((response) => {
          if (response.data.status === "success") {
            this.SET_CHAOS_SERVER_STATUS({
              max_players: response.data.players.max,
              current_players: response.data.players.now,
              server_name: response.data.server.name,
              protocol: response.data.server.protocol,
              last_updated: response.data.last_updated,
              duration: response.data.duration,
              online: response.data.online,
              status: response.data.status,
              players: response.data.players.sample,
            });
          }
          //context.commit('retrieveRhOrganizationList', response.data)
          //context.commit('rhOrganisationListChangeLoading', false)
          //resolve(response)
        })
        .catch((error) => {
          //context.commit('rhOrganisationListChangeLoading', false)
          //reject(error)
          console.log(error);
        })
        .finally(() => {
          this.CHANGE_IS_UPDATING(false);
        });
      //https://mcapi.us/server/status?ip=chaos.moonsama.com&port=27000
      //https://mcapi.xdefcon.com/server/canary.moonsama.com:27000/full/json
      // API.get("roodgeelblauw-api", "/api/v1/balance", myInit)
      //   .then(response => {
      //     console.log("success");
      //     console.log(response);
      //     //this.SET_BALANCE(response.data);
      //   })
    }
  }

  //https://api-moonriver.moonscan.io/api?module=account&action=tokenbalance&contractaddress=0x8ce2bdc6e0319cea87337d027382f09b715c9601&address=0x3526Df3288bd0874e059643fA9645beCaA571FEC&tag=latest&apikey=I51W6JMETFZRF8HQ45XT1ZMDIC53GTEGUV
  @Action
  getTokenAmount(params: { wallet_address: string; token_id: string, network_id: number, component: any }): void {
    // this.$modules.metamask.getBalance(params: { wallet_address: string; token_id: string, network_id: number })

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const network = provider.getNetwork();
    // if(network.chainId != params.network_id){
    //   this.$modules.metamask.switch_to_chain(params.network_id);
    // }
    // const searchIndex = this.tokens.findIndex(
    //   (token) => token.name == params.token_name
    // );
    // const selected_token = this.tokens[searchIndex];
    // console.info(selected_token.name);

    provider
      .getBalance("0x3526Df3288bd0874e059643fA9645beCaA571FEC") //needs an address as input, gets network amount. Devide by 10^18
      .then((balance) => {
        console.log(`getBalance: ${balance}`);
        console.log(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        //reject(error)
        console.log(error);
      })
      .finally(() => {
        this.CHANGE_IS_UPDATING(false);
      });

    const abi = [
      // Some details about the token
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    // Get the account balance
    "function balanceOf(address) view returns (uint)",
    // Send some of your tokens to someone else
    "function transfer(address to, uint amount)",
    // An event triggered whenever anyone transfers to someone else
    "event Transfer(address indexed from, address indexed to, uint amount)"

    ];
    const token = new ERC20Resource(params.token_id, params.network_id, abi);
    params.component.$modules.metamask.getBalance({
      tokenContractAddress: token.tokenContractAddress,
      chain_id: token.networkId,
      abi: token.abi,
      wallet_address: params.wallet_address
    })
    const contract = new ethers.Contract(token.tokenContractAddress, abi, provider);
    contract.balanceOf(params.wallet_address)
      .then((response: string) => {
      console.log(response);
      console.log(ethers.utils.formatEther(response));
      console.log(typeof (ethers.utils.formatEther(response)));
    })
    .catch((error: any) => {
        //reject(error)
        console.log(error);
      })
      .finally(() => {
        console.log('finally');
      });
    // token.getBalance(params.wallet_address, this);

    // if (!this.isUpdating) {
    //   this.CHANGE_IS_UPDATING(true);
    //   const queryUrl = `https://api-moonriver.moonscan.io/api?module=account&action=tokenbalance&contractaddress=${selected_token.token_id}&address=${params.address}&tag=latest&apikey=${this.api_key}`;
    //   let amount = 0;
    //   axios
    //     .get(queryUrl)
    //     .then((response) => {
    //       if (response.data.status === "1") {
    //         amount = parseInt(response.data.result);
    //         switch (params.token_name) {
    //           case "Alpha Experience":
    //             this.SET_EXPERIENCE_AMOUNT(amount);
    //             break;
    //           case "Alpha Gold":
    //             this.SET_GOLD_AMOUNT(amount);
    //             break;
    //           case "Alpha Iron":
    //             this.SET_GOLD_AMOUNT(amount);
    //             break;
    //           case "Alpha Stone":
    //             this.SET_COBBLESTONE_AMOUNT(amount);
    //             break;
    //           case "Alpha Wood":
    //             this.SET_COBBLESTONE_AMOUNT(amount);
    //             break;
    //         }
    //       }
    //     })
    //     .catch((error) => {
    //       //context.commit('rhOrganisationListChangeLoading', false)
    //       //reject(error)
    //       console.log(error);
    //     })
    //     .finally(() => {
    //       this.CHANGE_IS_UPDATING(false);
    //     });
    // }
  }

  // @Action update() {
  //   const address = "0x3526Df3288bd0874e059643fA9645beCaA571FEC"
  //   const token_id = this.tokens[0].token_id
  //   this.getTokenAmount({ address: address, token_id: token_id });
  // }
}
