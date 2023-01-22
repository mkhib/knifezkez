import { render, fireEvent } from "@testing-library/react-native";
import { wrapInUiKittenApplicationProvider } from "../../utils/testUtils";
import AddOrEditPlayerModalScreen from "../AddOrEditPlayerModalScreen";

describe("Add or edit player modal screen", () => {
  it("should be able to edit player name", async () => {
    const { findByPlaceholderText, findByText } = render(
      wrapInUiKittenApplicationProvider(<AddOrEditPlayerModalScreen />)
    );
    const playerNameInput = await findByPlaceholderText("Name");

    fireEvent.changeText(playerNameInput, "araa");

    const enteredPlayerName = await findByText("araa");

    expect(enteredPlayerName).toBeTruthy();
  });

  it("should be able to edit player points", async () => {
    const { findByPlaceholderText, findByText } = render(
      wrapInUiKittenApplicationProvider(<AddOrEditPlayerModalScreen />)
    );
    const playerPointsInput = await findByPlaceholderText("Points");

    fireEvent.changeText(playerPointsInput, "85");

    const enteredPlayerPoints = await findByText("85");

    expect(enteredPlayerPoints).toBeTruthy();
  });
});
