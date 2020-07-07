import { Text, View } from "../components/Themed";
import { Ionicons } from "@expo/vector-icons";

import React, { useState, useContext, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Platform,
} from "react-native";

import DraggableFlatList from "react-native-draggable-flatlist";

import ColorPicker from "../ColorPicker";
import { Player } from "../App";
import { colors } from "../models/color";
import { PlayerContext } from "../context/player";
import { SettingsContext } from "../context/settings";
import { Switch } from "react-native-gesture-handler";
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

  const canAddPlayer = newPlayer.name.length > 0;

  function getNextColor(players: Player[]) {
    const colorIndex = players.length % colors.length;
    return colors[colorIndex];
  }

  function addPlayer() {
    if (!canAddPlayer) return;

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
        <View style={styles.transparent}>
          <DraggableFlatList
            style={styles.draggableFlatlist}
            data={players}
            ListHeaderComponent={
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
                <TouchableOpacity
                  style={{
                    ...styles.icon,
                    opacity: canAddPlayer ? 1 : 0.5,
                  }}
                  disabled={!canAddPlayer}
                  onPress={() => {
                    addPlayer();
                  }}
                >
                  <Ionicons name="md-add" size={30} />
                </TouchableOpacity>
              </View>
            }
            renderItem={({ item: player, index, drag }) => (
              <View key={index} style={styles.playerInputs}>
                <TouchableOpacity onPressIn={drag} style={styles.icon}>
                  <Ionicons name="md-menu" size={30} />
                </TouchableOpacity>

                <TextInput
                  style={styles.input}
                  value={player.name}
                  onChangeText={(name) =>
                    setPlayers((players) =>
                      players.map((player, i) => {
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
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => {
                    setPlayers((players) =>
                      players.filter((player, i) => index !== i)
                    );
                  }}
                >
                  <Ionicons name="md-trash" size={30} />
                </TouchableOpacity>
                <ColorPicker
                  selected={player.color}
                  onChange={(color) => {
                    setPlayers((players) =>
                      players.map((player, i) => {
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
            )}
            keyExtractor={(item, index) => `draggable-item-${item.name}`}
            onDragEnd={({ data }) => setPlayers(data)}
            ListFooterComponent={
              <View style={styles.switchContainer}>
                <Switch
                  trackColor={{ false: "#767577", true: "lightgrey" }}
                  thumbColor={settings.soundEnabled ? "green" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={settings.soundEnabled}
                  style={{
                    transform:
                      Platform.OS === "android"
                        ? [{ scaleX: 1.5 }, { scaleY: 1.5 }]
                        : [{ scaleX: 1 }, { scaleY: 1 }],
                  }}
                />
                <Text style={styles.switchText}>
                  {settings.soundEnabled ? "SOUND ON" : "SOUND OFF"}
                </Text>
              </View>
            }
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: "center",
  },
  transparent: {
    backgroundColor: "transparent",
  },
  draggableFlatlist: {
    minWidth: "100%",
    marginTop: 30,
  },
  playerInputs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: 30,
    marginRight: 30,
    margin: 15,
    backgroundColor: "transparent",
    flex: 1,
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
    flex: 1,
  },
  icon: {
    padding: 10,
  },
  switchContainer: {
    alignItems: "center",
    padding: 50,
    backgroundColor: "transparent",
  },
  switchText: {
    marginTop: 10,
    fontSize: 18,
  },
});
