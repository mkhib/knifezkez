import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

export type PlayerType = {
  id: string;
  name: string;
  overallPoints: string;
};

type PlayersState = {
  players: Record<string, PlayerType>;
  playerToAddOrEdit: PlayerType;
  selectedPlayersForTheMatch: Set<string>;
};

type PlayersActions = {
  addOrEditPlayer: (player: PlayerType) => void;
  removePlayer: (playerId: string) => void;
  setPlayerToAddOrEdit: (player: PlayerType) => void;
  setPlayerName: (name: string) => void;
  setPlayerPoints: (points: string) => void;
  clearPlayerToAddOrEdit: () => void;
  addPlayerToTheMatch: (playerId: string) => void;
  removePlayerFromTheMatch: (playerId: string) => void;
};

const initialPlayersState: PlayersState = {
  players: {},
  playerToAddOrEdit: {
    id: "",
    name: "",
    overallPoints: "",
  },
  selectedPlayersForTheMatch: new Set(),
};

const playersStoreInitializer: StateCreator<
  PlayersState & PlayersActions,
  [["zustand/persist", unknown], ["zustand/immer", never]],
  [],
  PlayersState & PlayersActions
> = (set) => ({
  ...initialPlayersState,
  addOrEditPlayer: (player) =>
    set((state) => {
      if (player.id) {
        state.players[player.id] = player;
      } else {
        const newPlayerId = uuidv4();
        state.players[newPlayerId] = player;
      }
    }),

  removePlayer: (playerId) =>
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

  setPlayerToAddOrEdit: (player) =>
    set((state) => {
      state.playerToAddOrEdit = player;
    }),

  addPlayerToTheMatch: (playerId) =>
    set((state) => {
      state.selectedPlayersForTheMatch.add(playerId);
    }),

  removePlayerFromTheMatch: (playerId) =>
    set((state) => {
      state.selectedPlayersForTheMatch.delete(playerId);
    }),

  clearPlayerToAddOrEdit: () =>
    set((state) => {
      state.playerToAddOrEdit = initialPlayersState.playerToAddOrEdit;
    }),
});

const createPlayersStore = persist(immer(playersStoreInitializer), {
  name: "players",
  storage: createJSONStorage(() => AsyncStorage),
});

export const usePlayersStore = create(createPlayersStore);
