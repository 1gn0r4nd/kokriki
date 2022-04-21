<template>
  <v-data-table
    class="elevation-1"
    dense
    :headers="headers"
    :items="moonsama_events"
    item-class="provider"
    item-key="name"
    :loading="moonsama_eventsLoading"
    loading-text="Tan Tirie. Help je zelf"
    :options.sync="options"
    :server-items-length="totalEvents"
    :footer-props="{
      itemsPerPageOptions: [5, 10, 15],
      itemsPerPageText: 'Rows per page',
      'show-current-page': true,
      'show-first-last-page': true,
    }"
  >
    <template v-slot:item.formattedAmount="{ item }">
      <v-chip :color="getColor(item.provider)">
        {{ item.formattedAmount }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { moonsama_event } from "@/store/modules/moonsama";
import { PaginateOptions } from "@/models/paginate_options";
@Component({ components: {} })
export default class MoonsamaEventsTable extends Vue {
  headers = [
    {
      text: "Name",
      align: "start",
      sortable: false,
      groupable: false,
      value: "name",
    },
    {
      text: "Players",
      align: "start",
      sortable: false,
      value: "players",
    },
    {
      text: "Date & Time",
      align: "start",
      sortable: false,
      value: "date",
    },
    {
      text: "Host",
      align: "start",
      sortable: false,
      value: "host",
    },
    {
      text: "Server",
      align: "start",
      sortable: false,
      value: "server",
    },
  ];

  options = new PaginateOptions([], [], 5, false, false, [], 1, []);

  get moonsama_events(): moonsama_event[] {
    return this.$modules.moonsama.events;
  }
  get moonsama_eventsLoading(): boolean {
    return false;
  }

  get totalEvents(): number {
    return this.$modules.moonsama.totalEvents;
  }

  mounted(): void {
    this.$modules.moonsama.getEvents();
  }
}
</script>

<style scoped></style>
