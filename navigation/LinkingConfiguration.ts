import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              Home: "one",
            },
          },
          Settings: {
            screens: {
              Settings: "two",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
