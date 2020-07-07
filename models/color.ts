export type ColorId =
  | "ORANGE"
  | "YELLOW"
  | "BLUE"
  | "RED"
  | "GREEN"
  | "BLACK"
  | "WHITE"
  | "PINK"
  | "PURPLE";

export type Color = {
  id: ColorId;
  value: string;
};

export const colors: Color[] = [
  {
    id: "ORANGE",
    value: "#FFA500",
  },
  {
    id: "YELLOW",
    value: "#FFFF66",
  },
  {
    id: "BLUE",
    value: "#2128fc",
  },
  {
    id: "RED",
    value: "#F92525",
  },
  {
    id: "GREEN",
    value: "#1ba303",
  },
  {
    id: "PINK",
    value: "#FFB6C1",
  },
  {
    id: "PURPLE",
    value: "#800080",
  },
  {
    id: "BLACK",
    value: "#666",
  },
  {
    id: "WHITE",
    value: "#eee",
  },
];
