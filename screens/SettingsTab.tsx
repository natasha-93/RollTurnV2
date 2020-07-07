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
    if (newPlayer.name === "") return;
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
          style={{ flex: 1, marginTop: 20 }}
          contentInsetAdjustmentBehavior="automatic"
        >
          <View style={styles.playerInputs}>
            <TextInput
              placeholder="Add player..."
              style={{ ...styles.input, flex: 1 }}
              value={newPlayer.name}
              onChangeText={(name) => setNewPlayer({ ...newPlayer, name })}
              onSubmitEditing={() => {
                addPlayer();
              }}
            />
            <TouchableOpacity
              style={{
                padding: 10,
                opacity: newPlayer.name.length > 0 ? 1 : 0.5,
              }}
              disabled={newPlayer.name.length < 1}
              onPress={() => {
                addPlayer();
              }}
            >
              <Ionicons name="md-add" size={30} />
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: "transparent" }}>
            <DraggableFlatList
              data={players}
              renderItem={({ item: player, index, drag }) => (
                <View key={index} style={styles.playerInputs}>
                  <TouchableOpacity onPressIn={drag} style={{ padding: 10 }}>
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
                    style={{ padding: 10 }}
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
            />
          </View>
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
            <Text style={{ marginTop: 10, fontSize: 18 }}>
              {settings.soundEnabled ? "SOUND ON" : "SOUND OFF"}
            </Text>
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
    padding: 50,
    backgroundColor: "transparent",
  },
});
