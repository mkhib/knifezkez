import { Entypo } from "@expo/vector-icons";
import { Button, CheckBox } from "@ui-kitten/components";
import { FC, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PlayerType } from "../zustand/usePlayersStore";

const EditIcon = () => <Entypo name="edit" size={20} color="black" />;

const Player: FC<PlayerProps> = ({
  player,
  showPlayerPoints,
  playerIsInTheMatch,
  onPlayerBeingInMatchStatusChange,
  onPressEditPlayer,
}) => {
  const { id, name, overallPoints } = player;

  const handlePlayerBeingInMatchStatusChange = useCallback(() => {
    onPlayerBeingInMatchStatusChange?.(id);
  }, []);

  const handleOnPressEditPlayer = useCallback(() => {
    onPressEditPlayer?.(player);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <CheckBox
          style={styles.checkbox}
          checked={playerIsInTheMatch}
          onChange={handlePlayerBeingInMatchStatusChange}
        />
        <Text>{name}</Text>
        {showPlayerPoints && <Text>{overallPoints}</Text>}
      </View>

      <Button
        onPress={handleOnPressEditPlayer}
        appearance="ghost"
        accessoryLeft={EditIcon}
      />
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#d6d6d6",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    flex: 1,
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
  },
});

interface PlayerProps {
  player: PlayerType;
  showPlayerPoints?: boolean;
  playerIsInTheMatch?: boolean;
  onPlayerBeingInMatchStatusChange?: (playerId: string) => void;
  onPressEditPlayer?: (player: PlayerType) => void;
}
