import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Player} from '../App';

type PlayerContext = {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  storePlayers: (players: Player[]) => Promise<Player[]>;
};

type PlayerProviderProps = {
  children: JSX.Element;
};

export const PlayerContext = createContext<PlayerContext>({
  players: [],
} as any);

export const PLAYERS_STORAGE_KEY = 'players';

export const PlayerProvider = ({children}: PlayerProviderProps) => {
  const [players, setPlayers] = useState<Player[]>([]);

  const loadPlayers = async () => {
    const playersJson =
      (await AsyncStorage.getItem(PLAYERS_STORAGE_KEY)) ?? '[]';
    const players = JSON.parse(playersJson) as Player[];

    setPlayers(players);
  };

  const storePlayers = async (players: Player[]) => {
    await AsyncStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(players));

    return players;
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  return (
    <PlayerContext.Provider value={{players, setPlayers, storePlayers}}>
      {children}
    </PlayerContext.Provider>
  );
};
