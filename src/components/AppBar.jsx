import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

import useCurrentUser from "../hooks/useCurrentUser";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.navBackground,
    display: "flex",
    flexDirection: "row",
  },
  item: {
    flexGrow: 1,
    color: theme.colors.navPrimary,
    backgroundColor: theme.colors.navBackground,
    fontSize: theme.fontSizes.navHeading,
    fontWeight: theme.fontWeights.bold,
    padding: theme.padding.navPadding,
    paddingTop: theme.padding.navPaddingTop,
  },
});

const AppBar = () => {
  const { currentUser } = useCurrentUser();
  const username = currentUser?.username;

  return (
    <View>
      <ScrollView horizontal style={styles.container}>
        <View style={styles.item}>
          <AppBarTab style={styles.item} link="/" text="Repositories" />
        </View>
        <View style={styles.item}>
          {username && (
            <AppBarTab
              style={styles.item}
              link="/createReview"
              text="Create a review"
            />
          )}
        </View>
        <View style={styles.item}>
          {username && (
            <AppBarTab
              style={styles.item}
              link="/myReviews"
              text="My reviews"
            />
          )}
        </View>
        <View style={styles.item}>
          {username ? (
            <AppBarTab style={styles.item} link="/signIn" text="Sign Out" />
          ) : (
            <AppBarTab style={styles.item} link="/signIn" text="Sign In" />
          )}
        </View>
        <View style={styles.item}>
          {!username && (
            <AppBarTab style={styles.item} link="/signUp" text="Sign Up" />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
