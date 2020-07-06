import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

type Settings = {
  soundEnabled: boolean;
};

type SettingsContext = {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  storeSettings: (settings: Settings) => Promise<Settings>;
};

type SettingsProviderProps = {
  children: JSX.Element;
};

export const SettingsContext = createContext<SettingsContext>({
  soundEnabled: true,
} as any);

export const SETTINGS_STORAGE_KEY = 'settings';

export const SettingsProvider = ({children}: SettingsProviderProps) => {
  const [settings, setSettings] = useState<Settings>({
    soundEnabled: true,
  });

  const loadSettings = async () => {
    const settingsJson =
      (await AsyncStorage.getItem(SETTINGS_STORAGE_KEY)) ?? '[]';
    const settings = JSON.parse(settingsJson) as Settings;

    setSettings(settings);
  };

  const storeSettings = async (settings: Settings) => {
    await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));

    return settings;
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{settings, setSettings, storeSettings}}>
      {children}
    </SettingsContext.Provider>
  );
};
