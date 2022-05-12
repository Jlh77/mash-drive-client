import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import ScreenStack from "./routes/ScreenStack";
import { Navbar } from "./components/index";
import { UserProvider } from "./contexts/User";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <ScreenStack />
        <Navbar />
      </NavigationContainer>
    </UserProvider>
  );
}
