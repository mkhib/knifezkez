import { Input, List, Button } from "@ui-kitten/components";
import { useCallback, useMemo } from "react";
import Player from "../components/Player";
import { PlayerType, usePlayersStore } from "../zustand/usePlayersStore";
import { RootStackScreenProps } from "../types";
import { View, StyleSheet } from "react-native";

const PlayersScreen = ({ navigation }: RootStackScreenProps<"Players">) => {
  const players = usePlayersStore((state) => state.players);
  const addOrRemovePlayerToTheMatch = usePlayersStore(
    (state) => state.addOrRemovePlayerToTheMatch
  );
  const selectedPlayersForTheMatch = usePlayersStore(
    (state) => state.selectedPlayersForTheMatch
  );
  const setPlayerToEdit = usePlayersStore((state) => state.setPlayerToEdit);

  const handlePlayersData = useMemo(() => {
    return Object.entries(players).map((entry) => {
      return entry[1];
    });
  }, [players]);

  const handleListDataKey = useCallback(
    (player: PlayerType) => player.id,
    [players]
  );

  const handleSetPlayerToEdit = useCallback((player: PlayerType) => {
    setPlayerToEdit(player);
    navigation.navigate("AddOrEditPlayerModal");
  }, []);

  const renderPlayerItem = useCallback(
    ({ item }: { item: PlayerType }) => {
      return (
        <Player
          player={item}
          onPressEditPlayer={handleSetPlayerToEdit}
          playerIsInTheMatch={selectedPlayersForTheMatch.includes(item.id)}
          onPlayerBeingInMatchStatusChange={addOrRemovePlayerToTheMatch}
        />
      );
    },
    [players, selectedPlayersForTheMatch]
  );

  const handleOnAddPlayerPress = useCallback(() => {
    navigation.navigate("AddOrEditPlayerModal");
  }, []);

  return (
    <List
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={
        <View>
          {Object.keys(players).length > 0 && (
            <Input placeholder="Search Player" />
          )}
          <Button
            style={styles.addPlayerButton}
            onPress={handleOnAddPlayerPress}
          >
            Add Player
          </Button>
        </View>
      }
      data={handlePlayersData}
      keyExtractor={handleListDataKey}
      renderItem={renderPlayerItem}
    />
  );
};

export default PlayersScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
  addPlayerButton: {
    marginVertical: 10,
  },
});
