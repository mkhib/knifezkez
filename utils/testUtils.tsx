import { ReactNode } from "react";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

export const wrapInUiKittenApplicationProvider = (component: ReactNode) => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        {component}
      </ApplicationProvider>
    </>
  );
};
