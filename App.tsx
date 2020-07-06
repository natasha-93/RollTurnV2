import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Color } from "./models/color";
import { PlayerProvider } from "./context/player";
import { SettingsProvider } from "./context/settings";

export type Player = {
  name: string;
  color: Color;
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PlayerProvider>
        <SettingsProvider>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </SettingsProvider>
      </PlayerProvider>
    );
  }
}
