import { FC } from "react";
import { View, Text } from "react-native";
import { Icon, Button } from "@ui-kitten/components";
import { PlayerType } from "../zustand/usePlayersStore";

const Player: FC<PlayerProps> = ({
  player: { name, overallPoints },
  showPlayerPoints,
}) => {
  return (
    <View>
      <Text>{name}</Text>
      {showPlayerPoints && <Text>{overallPoints}</Text>}

      <Button>
        <Icon name="edit-outline" />
      </Button>
    </View>
  );
};

export default Player;

interface PlayerProps {
  player: PlayerType;
  showPlayerPoints?: boolean;
}
