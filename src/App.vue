<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          :src="require('@/assets/logo.svg')"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <button-connect-wallet />
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <moonsama-events-table />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <minecraft-server-status-card />
          </v-col>
          <v-col cols="4">
            <wallet-resources />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">

          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ButtonConnectWallet from "./components/ButtonConnectWallet.vue";
import MinecraftServerStatusCard from "@/components/MinecraftServerStatusCard.vue";
import MoonsamaEventsTable from "@/components/MoonsamaEventsTable.vue";
import WalletResources from "@/components/WalletResources.vue";
@Component({
  components: {
    WalletResources,
    MoonsamaEventsTable,
    MinecraftServerStatusCard,
    ButtonConnectWallet,
  },
})
export default class App extends Vue {
}
</script>
