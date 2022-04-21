<template>
  <v-card color="FF0000">
    <v-list dense>
      <v-subheader>My Wallet</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-icon>
            <v-img
              :src="require(`../assets/${item.icon}.png`)"
              class="my-3"
              contain
              height="20"
            />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-img
      :src="require('../assets/moonsama_resources.jpg')"
      class="my-3"
      contain
      height="200"
    />
  </v-card>
</template>

<script lang="ts">
//import Vue from "vue";
// import { Component, Prop, Vue } from "vue-property-decorator";
import { Component, Vue } from "vue-property-decorator";
import { AccountChangedSubscriber } from "@/store/modules/metamask";

@Component({ components: {} })
export default class WalletResources
  extends Vue
  implements AccountChangedSubscriber
{
  items = [
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

  // get items(): {
  //     text: string,
  //     icon: string,
  //     token_id: string,
  //     name: string,
  //     type: string,
  //     qty: number
  //   }[]{
  //   this.$modules.minecraft.update();
  //   return [];
  // }
  mounted(): void {
    //register that we want to get an update with new address
    this.$modules.metamask.add_account_changed_subscriber(this);
  }

  refresh(wallet_address: string): void {
    this.$modules.minecraft.getTokenAmount({
      wallet_address,
      token_id: "0x8ce2bdc6e0319cea87337d027382f09b715c9601",
      network_id: 1285,
      component: this,
    });
  }
}
</script>

<style scoped></style>
