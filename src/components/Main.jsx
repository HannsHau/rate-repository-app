import Constants from "expo-constants";
import { Text, StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import FancyTextCollection from "./BigBlueText";
import FlexboxExample from "./FlexboxExample";
import AppBar from "./AppBar";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <FancyTextCollection />
      <FlexboxExample></FlexboxExample>
      <Text>Rate Repository Application</Text>
      <RepositoryList></RepositoryList>
      
    </View>
  );
};

export default Main;
