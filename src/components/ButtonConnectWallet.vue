<template>
  <div>
    metamask.isconnected: {{ metamask_is_connected }}
    <v-btn @click="disconnect">
      <v-img
        :src="require(`../assets/chain_${network_chain_id}.png`)"
        class="my-3"
        contain
        height="20"
      />
      {{ current_account }} Disconnect
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
    <v-btn @click="connect">
      <v-img
        :src="require(`../assets/chain_${network_chain_id}.png`)"
        class="my-3"
        contain
        height="20"
      />
      Connect
    </v-btn>
  </div>
</template>

<script lang="ts">
//import Vue from "vue";
import { Component, Vue } from "vue-property-decorator";
@Component({ components: {} })
export default class ButtonConnectWallet extends Vue {
  mounted(): void {
    if (typeof window.ethereum === "undefined") {
      //alert("MetaMask not Detected");
    } else {
      // if (this.$modules.metamask.is_metamask_installed()) {
      //alert("MetaMask detected");{
      this.$modules.metamask.setup_metamask();
      //}
      // } else {
      //different type of wallet is installed
      // }
    }
  }
  get network_chain_id(): number {
    return this.$modules.metamask.selected_chain_id;
  }

  get current_account() : string {
    return this.$modules.metamask.currentAccount;
  }
  connect(): void {
    this.$modules.metamask.onClickConnect();
  }

  disconnect(): void {
    this.$modules.metamask.disconnect();
  }

  isConnected(): boolean {
    //todo Doesnt work
    if (typeof window.ethereum === "undefined") {
      console.log("undefined?");
      return false;
    } else if (this.current_account == null) {
        console.info("dApp is disconnected!");
        return false;
    } else {
      console.log("isConnected: defined");
      return true;
      //return this.$modules.metamask.provider != null;
      // && window.ethereum.isConnected()
    }
  }

  get metamask_is_connected(): boolean{
    return window.ethereum.isConnected();
  }
  // async setupMetamask() {
  //   const provider = await detectEthereumProvider() as any
  //   provider.on('connect', (connectInfo: ConnectInfo) => {
  //     console.log(connectInfo)
  //     store.commit('setChainId', connectInfo.chainId)
  //   })
  //   // watch when user change account
  //   provider.on('accountsChanged', (accounts: string[]) => {
  //     // console.log(accounts)
  //     if (accounts.length > 0) {
  //       store.commit('setDefaultAaccount', accounts[0])
  //     }
  //   })
  // }
}
</script>
<style scoped></style>
