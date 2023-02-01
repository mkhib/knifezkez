import { ScrollView, StyleSheet } from "react-native";
import { usePlayersStore } from "../zustand/usePlayersStore";
import { Button, Card, Layout, Text } from "@ui-kitten/components";

const TeamsScreen = () => {
  const team1 = usePlayersStore((state) => state.teams.team1);
  const team2 = usePlayersStore((state) => state.teams.team2);
  const players = usePlayersStore((state) => state.players);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Layout style={styles.layout} level="2">
        <Card header={<Text>Team 1</Text>} status="warning">
          {team1.map((playerId) => (
            <Text key={playerId} style={styles.playerText}>
              {players[playerId].name}
            </Text>
          ))}
        </Card>

        <Card
          style={styles.team2Card}
          header={<Text>Team 2</Text>}
          status="danger"
        >
          {team2.map((playerId) => (
            <Text key={playerId} style={styles.playerText}>
              {players[playerId].name}
            </Text>
          ))}
        </Card>
      </Layout>
    </ScrollView>
  );
};

export default TeamsScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  layout: {
    padding: 10,
    flex: 1,
    height: "100%",
  },
  team2Card: {
    marginTop: 10,
  },
  playerText: {
    padding: 10,
  },
});
