import { Text, View } from "../components/Themed";

import React, { useState, useContext, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as Speech from "expo-speech";
import Die, { DieValue } from "../Die";
import { colors } from "../models/color";
import { PlayerContext } from "../context/player";
import { LinearGradient } from "expo-linear-gradient";
import { SettingsContext } from "../context/settings";
import { Ionicons } from "@expo/vector-icons";

function rollDie(min: DieValue = 1, max: DieValue = 6): DieValue {
  return Math.floor(Math.random() * (max - min) + min) as DieValue;
}

export default function HomeTab() {
  const [dice, setDice] = useState<DieValue[]>([rollDie()]);
  const [turnIndex, setTurnIndex] = useState(0);
  const { players } = useContext(PlayerContext);
  const { settings } = useContext(SettingsContext);

  const total = dice.reduce((sum, die) => sum + die, 0);

  players[turnIndex]?.color.value ?? colors[0].value;

  useEffect(() => {
    if (settings.soundEnabled) {
      Speech.speak(total.toString());
    }
  }, [dice]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={[players[turnIndex]?.color.value ?? "#a8edea", "white"]}
        style={styles.linearGradient}
      >
        <TouchableOpacity
          style={{ flex: 1, minWidth: "100%" }}
          onPress={() => {
            setDice((dice) => dice.map(() => rollDie()));
            setTurnIndex((turnIndex) => {
              if (turnIndex < players.length - 1) {
                return turnIndex + 1;
              } else {
                return 0;
              }
            });
          }}
        >
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{ minHeight: "100%" }}
            style={{ flex: 1 }}
          >
            {/* <View style={styles.rollBtn}>
              <Text style={styles.btnText}>Roll Dice</Text>
            </View> */}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{
                  ...styles.dieNumberBtn,
                  opacity: dice.length > 5 ? 0.3 : 1,
                }}
                disabled={dice.length > 5}
                onPress={() => setDice((dice) => [...dice, rollDie()])}
              >
                <Text style={styles.btnText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.dieNumberBtn,
                  opacity: dice.length <= 1 ? 0.3 : 1,
                }}
                disabled={dice.length <= 1}
                onPress={() => setDice((dice) => dice.slice(0, -1))}
              >
                <Text style={styles.btnText}>-</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.diceContainer}>
              {dice.map((die, i) => (
                <Die
                  key={i}
                  value={die}
                  style={{
                    ...styles.die,
                    width: 100 - dice.length * 7,
                    height: 100 - dice.length * 7,
                  }}
                />
              ))}
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.total}>{total}</Text>
              {players.length > 0 && (
                <>
                  <Text style={styles.playerTurn}>
                    {players[turnIndex].name}
                  </Text>

                  <TouchableOpacity
                    style={{ padding: 20 }}
                    onPress={() => {
                      setDice((dice) => dice.map(() => rollDie()));
                    }}
                  >
                    <Ionicons name="md-refresh" size={30} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </ScrollView>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  rollBtn: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  dieNumberBtn: {
    padding: 40,
    marginLeft: 15,
    marginRight: 15,
  },
  btnText: {
    fontSize: 60,
  },
  diceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 330,
    backgroundColor: "transparent",
  },
  die: {
    margin: 20,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  total: {
    fontWeight: "bold",
    fontSize: 70,
    minWidth: 100,
    textAlign: "center",
  },
  playerTurn: {
    fontSize: 40,
  },
});
