import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import type { StateCreator } from "zustand";
import * as zustand from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type PlayerType = {
  id: string;
  name: string;
  overallPoints: string;
};

type PlayersState = {
  players: Record<string, PlayerType>;
  playerToAddOrEdit: PlayerType;
  selectedPlayersForTheMatch: string[];
  playersSearchTerm: string;
  teams: {
    team1: string[];
    team2: string[];
  };
};

type PlayersActions = {
  addOrEditPlayer: () => void;
  deletePlayer: () => void;
  setPlayerToEdit: (player: PlayerType) => void;
  setPlayerName: (name: string) => void;
  setPlayerPoints: (points: string) => void;
  clearPlayerToAddOrEdit: () => void;
  addOrRemovePlayerToTheMatch: (playerId: string) => void;
  removeAllPlayersFromTheMatch: () => void;
  setPlayersSearchTerm: (searchTerm: string) => void;
  createRange: () => void;
};

const initialPlayersState: PlayersState = {
  players: {},
  playerToAddOrEdit: {
    id: "",
    name: "",
    overallPoints: "",
  },
  selectedPlayersForTheMatch: [],
  playersSearchTerm: "",
  teams: {
    team1: [],
    team2: [],
  },
};

const playersStoreInitializer: StateCreator<
  PlayersState & PlayersActions,
  [["zustand/persist", unknown], ["zustand/immer", never]],
  [],
  PlayersState & PlayersActions
> = (set) => ({
  ...initialPlayersState,
  addOrEditPlayer: () =>
    set((state) => {
      const player = state.playerToAddOrEdit;

      if (player.id) {
        console.log("console player", player);
        state.players[player.id] = player;
      } else {
        const newPlayerId = uuidv4();
        state.players[newPlayerId] = {
          ...player,
          id: newPlayerId,
        };
      }
    }),

  deletePlayer: () =>
    set((state) => {
      delete state.players[state.playerToAddOrEdit.id];
    }),

  setPlayerName: (name) =>
    set((state) => {
      state.playerToAddOrEdit.name = name;
    }),

  setPlayerPoints: (points) =>
    set((state) => {
      state.playerToAddOrEdit.overallPoints = points;
    }),

  setPlayerToEdit: (player) =>
    set((state) => {
      state.playerToAddOrEdit = player;
    }),

  addOrRemovePlayerToTheMatch: (playerId) =>
    set((state) => {
      const playerIndex = state.selectedPlayersForTheMatch.indexOf(playerId);

      if (playerIndex !== -1) {
        state.selectedPlayersForTheMatch.splice(playerIndex, 1);
      } else {
        state.selectedPlayersForTheMatch.push(playerId);
      }
    }),

  clearPlayerToAddOrEdit: () =>
    set((state) => {
      state.playerToAddOrEdit = initialPlayersState.playerToAddOrEdit;
    }),

  removeAllPlayersFromTheMatch: () =>
    set((state) => {
      state.selectedPlayersForTheMatch = [];
    }),

  setPlayersSearchTerm: (searchTerm) =>
    set((state) => {
      state.playersSearchTerm = searchTerm;
    }),

  createRange: () =>
    set((state) => {
      let clonePlayersInTheMatch = [...state.selectedPlayersForTheMatch];
      state.teams.team1 = [];
      state.teams.team2 = [];

      clonePlayersInTheMatch.sort((a, b) => {
        const aPoints = parseFloat(state.players[a].overallPoints);
        const bPoints = parseFloat(state.players[b].overallPoints);

        if (aPoints > bPoints) {
          return -1;
        } else if (aPoints < bPoints) {
          return 1;
        }
        return 0;
      });

      console.log(
        "console sorted",
        clonePlayersInTheMatch.map((playerId) => state.players[playerId].name)
      );

      state.teams.team1.push(
        clonePlayersInTheMatch[clonePlayersInTheMatch.length - 1]
      );

      state.teams.team2.push(
        clonePlayersInTheMatch[clonePlayersInTheMatch.length - 2]
      );

      clonePlayersInTheMatch.splice(clonePlayersInTheMatch.length - 2, 2);

      state.teams.team2.push(clonePlayersInTheMatch[0]);
      state.teams.team1.push(clonePlayersInTheMatch[1]);
      clonePlayersInTheMatch.splice(0, 2);

      state.teams.team2.push(
        clonePlayersInTheMatch[clonePlayersInTheMatch.length - 1]
      );

      state.teams.team1.push(
        clonePlayersInTheMatch[clonePlayersInTheMatch.length - 2]
      );
      clonePlayersInTheMatch.splice(clonePlayersInTheMatch.length - 2, 2);

      state.teams.team2.push(clonePlayersInTheMatch[0]);
      state.teams.team1.push(clonePlayersInTheMatch[1]);
      clonePlayersInTheMatch.splice(0, 2);

      let overallPointsOfTeam1 = 0;

      state.teams.team1.forEach((playerId) => {
        overallPointsOfTeam1 += parseFloat(
          state.players[playerId].overallPoints
        );
      });

      let overallPointsOfTeam2 = 0;

      state.teams.team2.forEach((playerId) => {
        overallPointsOfTeam2 += parseFloat(
          state.players[playerId].overallPoints
        );
      });

      if (overallPointsOfTeam1 > overallPointsOfTeam2) {
        state.teams.team2.push(clonePlayersInTheMatch[0]);
        state.teams.team1.push(clonePlayersInTheMatch[1]);
      } else {
        state.teams.team1.push(clonePlayersInTheMatch[0]);
        state.teams.team2.push(clonePlayersInTheMatch[1]);
      }

      console.log(
        "console teams",
        state.teams.team1.map((playerId) => state.players[playerId].name),
        "team2",
        state.teams.team2.map((playerId) => state.players[playerId].name)
      );

      console.log(
        "console ovteams",
        overallPointsOfTeam1,
        "t2:",
        overallPointsOfTeam2
      );
    }),
});

const createPlayersStore = persist(immer(playersStoreInitializer), {
  name: "playersStore",
  storage: createJSONStorage(() => AsyncStorage),
});

export const usePlayersStore = zustand.create(createPlayersStore);
