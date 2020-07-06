import React, { useState } from "react";
import { View, Modal, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Color } from "./models/color";

type ColorPickerProps = {
  selected: Color;
  onChange: (color: Color) => void;
  options: Color[];
};

export default function ColorPicker({
  selected,
  onChange,
  options,
}: ColorPickerProps) {
  const [colorModalVisible, setColorModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={colorModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {options.map((color) => (
              <TouchableOpacity
                key={color.id}
                onPress={() => {
                  onChange(color);

                  setColorModalVisible(!colorModalVisible);
                }}
                style={{
                  ...styles.openButton,
                  backgroundColor: color.value,
                }}
              >
                <Text />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={{
          ...styles.openButton,
          backgroundColor: selected.value,
        }}
        onPress={() => {
          setColorModalVisible(true);
        }}
      >
        <Text />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginTop: 50,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 80,
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: "black",
    elevation: 2,
  },
});
