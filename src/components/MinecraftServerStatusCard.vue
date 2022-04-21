<template>
  <div>
    <v-card>
      <v-card-title>
        Canary {{ canary_server_status.current_players }}/
        {{ canary_server_status.max_players }}
      </v-card-title>
      <v-list dense>
        <v-list-item v-for="(player, player_index) in canary_server_status.players" :key="player_index">
          <v-list-item-title v-text="player.name"></v-list-item-title>
          <v-list-item-content>
            {{ player.id }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn @click="refresh_canary">
        Refresh
      </v-btn>
    </v-card>
    <v-card>
      <v-card-title>
        Chaos {{ chaos_server_status.current_players }}/{{ chaos_server_status.max_players }}
      </v-card-title>
      <v-list dense>
        <v-list-item v-for="(player, player_index) in chaos_server_status.players" :key="player_index">
          <v-list-item-title v-text="player.name"></v-list-item-title>
          <v-list-item-content>
            {{ player.id }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn @click="refresh_chaos">
        Refresh
      </v-btn>
    </v-card>
    <v-card>
      <v-card-title>
        Carnage {{ carnage_server_status.current_players }}/{{ carnage_server_status.max_players }}
      </v-card-title>
      <v-list dense>
        <v-list-item v-for="(player, player_index) in carnage_server_status.players" :key="player_index">
          <v-list-item-title v-text="player.name"></v-list-item-title>
          <v-list-item-content>
            {{ player.id }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn @click="refresh_carnage">
        Refresh
      </v-btn>
    </v-card>
  </div>
</template>

<script lang="ts">
//import Vue from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";
//import { Component, Vue } from "vue-property-decorator";
import { minecraft_server_status } from "@/store/modules/minecraft";
@Component({ components: {} })
export default class MinecraftServerStatusCard extends Vue {
  @Prop({
    default: 0,
  })
  readonly minecraft_server_index!: number;

  mounted(): void {
    this.refresh_chaos();
    this.refresh_carnage();
    this.refresh_canary();
  }

  get canary_server_status(): minecraft_server_status {
    return this.$modules.minecraft.canary_server_status;
  }

  get chaos_server_status(): minecraft_server_status {
    return this.$modules.minecraft.chaos_server_status;
  }

  get carnage_server_status(): minecraft_server_status {
    return this.$modules.minecraft.carnage_server_status;
  }

  refresh_canary(): void {
    this.$modules.minecraft.getCanaryStatus();
  }

  refresh_chaos(): void {
    this.$modules.minecraft.getChaosStatus();
  }

  refresh_carnage(): void {
    this.$modules.minecraft.getCarnageStatus();
  }
}
</script>

<style scoped></style>
