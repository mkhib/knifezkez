import { StyleSheet, View } from "react-native";
import { Input, Button, Modal, Card, Text } from "@ui-kitten/components";
import { usePlayersStore } from "../zustand/usePlayersStore";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { RootStackScreenProps } from "../types";

const AddOrEditPlayerModalScreen: FC<
  RootStackScreenProps<"AddOrEditPlayerModal">
> = ({ navigation }) => {
  const nameInputRef = useRef<Input>(null);
  const pointsInputRef = useRef<Input>(null);

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  const openDeleteConfirmationModal = useCallback(() => {
    setShowDeleteConfirmationModal(true);
  }, []);

  const closeDeleteConfirmationModal = useCallback(() => {
    setShowDeleteConfirmationModal(false);
  }, []);

  const { id, name, overallPoints } = usePlayersStore(
    (state) => state.playerToAddOrEdit
  );

  const addOrEditPlayer = usePlayersStore((state) => state.addOrEditPlayer);
  const setPlayerName = usePlayersStore((state) => state.setPlayerName);
  const setPlayerPoints = usePlayersStore((state) => state.setPlayerPoints);
  const deletePlayer = usePlayersStore((state) => state.deletePlayer);

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

  const handleDeletePlayer = useCallback(() => {
    deletePlayer();
    clearPlayerToAddOrEdit();
    navigation.goBack();
  }, []);

  const handleOnNameSubmit = useCallback(() => {
    pointsInputRef.current?.focus();
  }, []);

  const disableSubmit = useMemo(() => {
    if (!name || !overallPoints) return true;
    else return false;
  }, [name, overallPoints]);

  return (
    <View style={styles.container}>
      <Input
        ref={nameInputRef}
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={handleSettingPlayerName}
        onSubmitEditing={handleOnNameSubmit}
        returnKeyType="next"
      />

      <Input
        ref={pointsInputRef}
        style={styles.input}
        placeholder="Points"
        value={overallPoints.toString()}
        keyboardType="numeric"
        onChangeText={handleSettingPlayerPoints}
        onSubmitEditing={handleAddOrEditPlayer}
      />

      <Button disabled={disableSubmit} onPress={handleAddOrEditPlayer}>
        {id ? "Edit" : "Add"}
      </Button>
      {!!id && (
        <Button
          style={styles.deleteButton}
          status={"danger"}
          onPress={openDeleteConfirmationModal}
        >
          Delete
        </Button>
      )}

      <Modal
        visible={showDeleteConfirmationModal}
        onBackdropPress={closeDeleteConfirmationModal}
        backdropStyle={styles.backdrop}
      >
        <Card>
          <Text>Are you sure you want to delete {name}?</Text>

          <Button
            style={styles.yesButton}
            status="danger"
            onPress={handleDeletePlayer}
          >
            Yes
          </Button>

          <Button status="control" onPress={closeDeleteConfirmationModal}>
            No
          </Button>
        </Card>
      </Modal>
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
  deleteButton: {
    marginTop: 10,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  yesButton: {
    marginVertical: 10,
  },
});
