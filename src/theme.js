import { Platform } from 'react-native'

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    textWhite: "#ffffff",
    primary: "#0366d6",
    navPrimary: "#ffffff",
    navBackground: "#24292e",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    navHeading: 20,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Ariel",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  padding: {
    navPadding: 10,
    navPaddingTop: 20,
  },
};

export default theme;
