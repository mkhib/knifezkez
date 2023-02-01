import { Input, List, Button, Text } from "@ui-kitten/components";
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
  const clearPlayerToAddOrEdit = usePlayersStore(
    (state) => state.clearPlayerToAddOrEdit
  );
  const playersSearchTerm = usePlayersStore((state) => state.playersSearchTerm);
  const setPlayersSearchTerm = usePlayersStore(
    (state) => state.setPlayersSearchTerm
  );
  const createRange = usePlayersStore((state) => state.createRange);
  const removeAllPlayersFromTheMatch = usePlayersStore(
    (state) => state.removeAllPlayersFromTheMatch
  );

  const handleCreateRange = useCallback(() => {
    createRange();
    navigation.navigate("Teams");
  }, []);

  const disableCreateRange = useMemo(() => {
    if (selectedPlayersForTheMatch.length !== 10) return true;
    return false;
  }, [selectedPlayersForTheMatch]);

  const handlePlayersData = useMemo(() => {
    return Object.entries(players)
      .filter((entry) => {
        return entry[1].name
          .toLowerCase()
          .includes(playersSearchTerm.toLowerCase());
      })
      .map((entry) => {
        return entry[1];
      });
  }, [players, playersSearchTerm]);

  const handleListDataKey = useCallback(
    (player: PlayerType) => player.id,
    [players]
  );

  const handleSetPlayerToEdit = useCallback(
    (player: PlayerType) => {
      console.log("player", player);
      setPlayerToEdit(player);
      navigation.navigate("AddOrEditPlayerModal");
    },
    [players]
  );

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
    clearPlayerToAddOrEdit();
    navigation.navigate("AddOrEditPlayerModal");
  }, []);

  return (
    <List
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          {Object.keys(players).length > 0 && (
            <Input
              style={{
                marginTop: 10,
              }}
              value={playersSearchTerm}
              clearButtonMode="always"
              onChangeText={setPlayersSearchTerm}
              placeholder="Search Player"
            />
          )}
          <View style={styles.modifyPlayersContainer}>
            <Button
              style={styles.addPlayerButton}
              onPress={handleOnAddPlayerPress}
              appearance="outline"
            >
              <Text>Add Player</Text>
            </Button>
            <Button
              appearance="ghost"
              style={styles.clearSelectedPlayersButton}
              onPress={removeAllPlayersFromTheMatch}
            >
              <Text>Clear Selection</Text>
            </Button>
          </View>

          <Button
            style={styles.rangeButton}
            disabled={disableCreateRange}
            onPress={handleCreateRange}
          >
            <Text>Create Range {`(${selectedPlayersForTheMatch.length})`}</Text>
          </Button>
        </View>
      }
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      data={handlePlayersData}
      keyExtractor={handleListDataKey}
      renderItem={renderPlayerItem}
    />
  );
};

export default PlayersScreen;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white",
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  addPlayerButton: {
    marginVertical: 10,
    flex: 1.5,
  },
  rangeButton: {
    marginBottom: 10,
  },

  modifyPlayersContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  clearSelectedPlayersButton: {
    marginLeft: 10,
    flex: 1,
  },
});
