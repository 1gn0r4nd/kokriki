import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
//import axios from "axios/index";
// import { AuthState } from '@aws-amplify/ui-components'
// import { API, Auth } from "aws-amplify";
// import { CognitoUser } from "@aws-amplify/auth";
// import { CognitoUserSession } from "amazon-cognito-identity-js";

export interface MoonsamaState {
  events: moonsama_event[];
  isUpdating: boolean;
  totalEvents: number;
}

export interface moonsama_event {
  name: string;
  players: number;
  date: string;
  host: string;
  server: string;
}

@Module({
  name: "Moonsama",
  namespaced: true,
  stateFactory: true,
})
export default class Moonsama extends VuexModule implements MoonsamaState {
  events: moonsama_event[] = [];
  isUpdating = false;
  totalEvents = 0;

  @Mutation
  CHANGE_IS_UPDATING(status: boolean): void {
    this.isUpdating = status;
  }

  @Mutation
  ADD_MOONSAMA_EVENT(event: moonsama_event): void {
    this.events.push(event);
    this.totalEvents += 1;
  }

  @Mutation
  SET_MOONSAMA_EVENTS(events: moonsama_event[]): void {
    this.events = events;
    this.totalEvents = events.length;
  }

  @Mutation
  SET_TOTAL_EVENTS(amount: number): void {
    this.totalEvents = amount;
  }

  //async getStatus(): Promise<minecraft_server_status> {
  @Action
  getEvents(): void {
    const events = [
      {
        name: "Horse Race",
        players: 180,
        date: "",
        host: "Baby Lokito",
        server: "chaos.moomsama.com:27000",
      },
      {
        name: "Defend the Castle",
        players: 32,
        date: "30/12/2021 @ 4PM UTC",
        host: "Baby Lokito",
        server: "chaos.moomsama.com:27000",
      },
    ];
    this.SET_MOONSAMA_EVENTS(events);
  }
}
