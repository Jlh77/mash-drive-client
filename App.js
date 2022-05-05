import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Navbar } from './components/index';
import { ScreenStack } from "./routes/index";
import { UserProvider } from "./contexts/User";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <ScreenStack/>
        <Navbar/>
      </NavigationContainer>
    </UserProvider>
  );
}
