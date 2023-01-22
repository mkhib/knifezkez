import { ReactNode } from "react";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

export const wrapInUiKittenApplicationProvider = (component: ReactNode) => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      {component}
    </ApplicationProvider>
  );
};
