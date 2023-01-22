import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Players: "players",
      Teams: "teams",
      AddOrEditPlayerModal: "add-or-edit-player-modal",
    },
  },
};

export default linking;
