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
};

type PlayersActions = {
  addOrEditPlayer: () => void;
  deletePlayer: (playerId: string) => void;
  setPlayerToEdit: (player: PlayerType) => void;
  setPlayerName: (name: string) => void;
  setPlayerPoints: (points: string) => void;
  clearPlayerToAddOrEdit: () => void;
  addOrRemovePlayerToTheMatch: (playerId: string) => void;
  removeAllPlayersFromTheMatch: () => void;
};

const initialPlayersState: PlayersState = {
  players: {},
  playerToAddOrEdit: {
    id: "",
    name: "",
    overallPoints: "",
  },
  selectedPlayersForTheMatch: [],
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
        state.players[player.id] = player;
      } else {
        const newPlayerId = uuidv4();
        state.players[newPlayerId] = {
          ...player,
          id: newPlayerId,
        };
      }
    }),

  deletePlayer: (playerId) =>
    set((state) => {
      delete state.players[playerId];
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
});

const createPlayersStore = persist(immer(playersStoreInitializer), {
  name: "playersStore",
  onRehydrateStorage: (state) => {
    console.log("console rehydrate storage", state);
  },
  storage: createJSONStorage(() => AsyncStorage),
});

export const usePlayersStore = zustand.create(createPlayersStore);
