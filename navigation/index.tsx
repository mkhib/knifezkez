import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import AddOrEditPlayerModalScreen from "../screens/AddOrEditPlayerModalScreen";
import PlayersScreen from "../screens/PlayersScreen";
import TeamsScreen from "../screens/TeamsScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Players" component={PlayersScreen} />
      <Stack.Screen name="Teams" component={TeamsScreen} />
      <Stack.Group
        screenOptions={{ presentation: "modal", headerTitle: "Player" }}
      >
        <Stack.Screen
          name="AddOrEditPlayerModal"
          component={AddOrEditPlayerModalScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
