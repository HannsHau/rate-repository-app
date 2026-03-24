import { Pressable, Text } from "react-native";
import { useLinkPressHandler } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client/react";

const AppBarTab = ({ text, link, style }) => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  let newStyle = { ...style, textAlign: "center" };

  const linkPressHandler = useLinkPressHandler(link); // Link's handler

  const onPressFunction = async () => {
    console.log("pressed");
    if (text === "Sign Out") {
      console.log("Sign Out pressed");
      await authStorage.removeAccessToken();
      apolloClient.resetStore();
    }
    linkPressHandler();
  };

  return (
    <Pressable onPress={onPressFunction}>
      <Text style={newStyle}>{text}</Text>
    </Pressable>
  );
};

export default AppBarTab;
