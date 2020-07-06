declare module "*.svg" {
  const content: React.ComponentType<{
    width?: number;
    height?: number;
    style?: React.CSSProperties;
  }>;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "react-native-tts" {
  const content: any;
  export default content;
}
