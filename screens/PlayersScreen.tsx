import { List, Button } from "@ui-kitten/components";
import { useCallback, useMemo } from "react";
import Player from "../components/Player";
import { PlayerType, usePlayersStore } from "../zustand/usePlayersStore";
import { RootStackScreenProps } from "../types";

const PlayersScreen = ({ navigation }: RootStackScreenProps<"Players">) => {
  const players = usePlayersStore((state) => state.players);

  const handlePlayersData = useMemo(() => {
    return Object.entries(players).map((entry) => {
      return entry[1];
    });
  }, [players]);

  const handleListDataKey = useCallback(
    (player: PlayerType) => player.id,
    [players]
  );

  const renderPlayerItem = useCallback(
    ({ item }: { item: PlayerType }) => {
      return <Player player={item} />;
    },
    [players]
  );

  const handleOnAddPlayerPress = useCallback(() => {
    navigation.navigate("AddOrEditPlayerModal");
  }, []);

  return (
    <List
      ListHeaderComponent={
        <Button onPress={handleOnAddPlayerPress}>Add Player</Button>
      }
      data={handlePlayersData}
      keyExtractor={handleListDataKey}
      renderItem={renderPlayerItem}
    />
  );
};

export default PlayersScreen;
