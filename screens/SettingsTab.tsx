import { Text, View } from "../components/Themed";
import { Ionicons } from "@expo/vector-icons";

import React, { useState, useContext, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from "react-native";

import ColorPicker from "../ColorPicker";
import { Player } from "../App";
import { colors } from "../models/color";
import { PlayerContext } from "../context/player";
import { SettingsContext } from "../context/settings";
import { ScrollView, Switch } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

export default function SettingsTab() {
  const { players, setPlayers, storePlayers } = useContext(PlayerContext);
  const { settings, setSettings, storeSettings } = useContext(SettingsContext);

  const toggleSwitch = () =>
    setSettings((settings) => ({
      ...settings,
      soundEnabled: !settings.soundEnabled,
    }));

  const [newPlayer, setNewPlayer] = useState<Player>({
    name: "",
    color: colors[0],
  });

  function getNextColor(players: Player[]) {
    const colorIndex = players.length % colors.length;
    return colors[colorIndex];
  }

  function addPlayer() {
    const newPlayers = [...players, newPlayer];
    setPlayers(newPlayers);
    setNewPlayer({
      name: "",
      color: getNextColor(newPlayers),
    });
  }

  useEffect(() => {
    storePlayers(players);
  }, [players]);

  useEffect(() => {
    storeSettings(settings);
  }, [settings]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#a8edea", "white"]}
        style={styles.linearGradient}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentInsetAdjustmentBehavior="automatic"
        >
          <View style={styles.playerInputs}>
            <TextInput
              placeholder="Add player..."
              style={styles.input}
              value={newPlayer.name}
              onChangeText={(name) => setNewPlayer({ ...newPlayer, name })}
              onSubmitEditing={() => {
                addPlayer();
              }}
            />
            <ColorPicker
              selected={newPlayer.color}
              onChange={(color) => {
                setNewPlayer((newPlayer) => ({
                  ...newPlayer,
                  color,
                }));
              }}
              options={colors}
            />
          </View>
          <View style={{ backgroundColor: "transparent" }}>
            {players.map((player, i) => (
              <View key={i} style={styles.playerInputs}>
                <TouchableOpacity
                  onPress={() => {
                    setPlayers((players) =>
                      players.filter((player, index) => index !== i)
                    );
                  }}
                >
                  <Ionicons name="md-trash" size={30} />
                </TouchableOpacity>

                <TextInput
                  style={styles.input}
                  value={player.name}
                  onChangeText={(name) =>
                    setPlayers((players) =>
                      players.map((player, index) => {
                        if (index !== i) return player;

                        return {
                          ...player,
                          name,
                        };
                      })
                    )
                  }
                  onSubmitEditing={() => {
                    addPlayer();
                  }}
                />
                <ColorPicker
                  selected={player.color}
                  onChange={(color) => {
                    setPlayers((players) =>
                      players.map((player, index) => {
                        if (index !== i) return player;

                        return {
                          ...player,
                          color,
                        };
                      })
                    );
                  }}
                  options={colors}
                />
              </View>
            ))}
          </View>
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{ false: "#767577", true: "lightgrey" }}
              thumbColor={settings.soundEnabled ? "green" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={settings.soundEnabled}
            />
            <Text>{settings.soundEnabled ? "SOUND ON" : "SOUND OFF"}</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: "center",
  },
  playerInputs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    margin: 20,
    backgroundColor: "transparent",
  },
  input: {
    fontSize: 30,
    height: 50,
    width: 200,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    padding: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  deleteButton: {
    fontSize: 30,
    height: 40,
  },
  switchContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "transparent",
  },
});
