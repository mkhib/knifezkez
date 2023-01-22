import { StyleSheet, View } from "react-native";
import { Input, Button } from "@ui-kitten/components";
import { usePlayersStore } from "../zustand/usePlayersStore";
import { useCallback } from "react";

const AddOrEditPlayerModalScreen = () => {
  const { id, name, overallPoints } = usePlayersStore(
    (state) => state.playerToAddOrEdit
  );

  const setPlayerName = usePlayersStore((state) => state.setPlayerName);

  const setPlayerPoints = usePlayersStore((state) => state.setPlayerPoints);

  const handleSettingPlayerName = useCallback(
    (name: string) => setPlayerName(name),
    []
  );

  const handleSettingPlayerPoints = useCallback(
    (points: string) => setPlayerPoints(points),
    []
  );

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={handleSettingPlayerName}
      />

      <Input
        style={styles.input}
        placeholder="Points"
        value={overallPoints.toString()}
        keyboardType="numeric"
        onChangeText={handleSettingPlayerPoints}
      />

      <Button>{id ? "Edit" : "Add"}</Button>
    </View>
  );
};

export default AddOrEditPlayerModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
});
