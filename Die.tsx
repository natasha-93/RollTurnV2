import React from "react";
import { Image, ImageStyle } from "react-native";

import One from "./assets/one.png";
import Two from "./assets/two.png";
import Three from "./assets/three.png";
import Four from "./assets/four.png";
import Five from "./assets/five.png";
import Six from "./assets/six.png";

export type DieValue = keyof typeof NumberDieMap;

type DieProps = {
  value: DieValue;
  style?: ImageStyle;
  // size?: number;
};

const NumberDieMap = {
  1: One,
  2: Two,
  3: Three,
  4: Four,
  5: Five,
  6: Six,
};

export default function Die({ value, style }: DieProps) {
  return <Image source={NumberDieMap[value]} style={style} />;
}
