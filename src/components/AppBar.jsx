import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight ,
  },
  item: {
    color: theme.colors.navPrimary,
    backgroundColor: theme.colors.navBackground,
    fontSize: theme.fontSizes.navHeading,
    fontWeight: theme.fontWeights.bold,
    padding: theme.padding.navPadding,
    paddingTop: theme.padding.navPaddingTop,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <AppBarTab style={styles.item} text="Repositories" />
      </View>
    </View>
  );
};

export default AppBar;
