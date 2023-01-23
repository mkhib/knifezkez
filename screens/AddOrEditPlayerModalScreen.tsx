import { StyleSheet, View } from "react-native";
import { Input, Button } from "@ui-kitten/components";
import { usePlayersStore } from "../zustand/usePlayersStore";
import { FC, useCallback } from "react";
import { RootStackScreenProps } from "../types";

const AddOrEditPlayerModalScreen: FC<
  RootStackScreenProps<"AddOrEditPlayerModal">
> = ({ navigation }) => {
  const { id, name, overallPoints } = usePlayersStore(
    (state) => state.playerToAddOrEdit
  );

  const addOrEditPlayer = usePlayersStore((state) => state.addOrEditPlayer);
  const setPlayerName = usePlayersStore((state) => state.setPlayerName);
  const setPlayerPoints = usePlayersStore((state) => state.setPlayerPoints);
  const clearPlayerToAddOrEdit = usePlayersStore(
    (state) => state.clearPlayerToAddOrEdit
  );

  const handleSettingPlayerName = useCallback(
    (name: string) => setPlayerName(name),
    []
  );

  const handleSettingPlayerPoints = useCallback(
    (points: string) => setPlayerPoints(points),
    []
  );

  const handleAddOrEditPlayer = useCallback(() => {
    addOrEditPlayer();
    clearPlayerToAddOrEdit();
    navigation.goBack();
  }, []);

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

      <Button onPress={handleAddOrEditPlayer}>{id ? "Edit" : "Add"}</Button>
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
