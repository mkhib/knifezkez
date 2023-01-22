import { render } from "@testing-library/react-native";
import Player from "../Player";
import { wrapInUiKittenApplicationProvider } from "../../utils/testUtils";

describe("Player Item", () => {
  it("should show player name", async () => {
    const { findByText, queryByText } = render(
      wrapInUiKittenApplicationProvider(
        <Player
          player={{
            id: "playerId",
            name: "Shayan",
            overallPoints: "100",
          }}
        />
      )
    );

    const playerName = await findByText("Shayan");
    const playerPoints = queryByText("100");

    expect(playerName).toBeTruthy();
    expect(playerPoints).toBeFalsy();
  });

  it("should show player points if show player points is true", async () => {
    const { findByText, queryByText } = render(
      wrapInUiKittenApplicationProvider(
        <Player
          player={{
            id: "playerId",
            name: "Shayan",
            overallPoints: "100",
          }}
          showPlayerPoints
        />
      )
    );

    const playerName = await findByText("Shayan");
    const playerPoints = queryByText("100");

    expect(playerName).toBeTruthy();
    expect(playerPoints).toBeTruthy();
  });
});
