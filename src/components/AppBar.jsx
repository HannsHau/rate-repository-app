import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

import { useQuery } from "@apollo/client/react";
import { ME } from "../graphql/queries";

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
  // eslint-disable-next-line no-unused-vars
  const { data, loading, error, refetch } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  });

  const username = data?.me?.username;
  if (username) {
    console.log("User: ", username);
  } else {
    console.log("no User");
  }

  return (
    <View>
      <ScrollView horizontal style={styles.container}>
        <View style={styles.item}>
          <AppBarTab style={styles.item} link="/" text="Repositories" />
        </View>
        <View style={styles.item}>
          {username ? (
            <AppBarTab style={styles.item} link="/signIn" text="Sign Out" />
          ) : (
            <AppBarTab style={styles.item} link="/signIn" text="Sign In" />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
