import { Pressable, Text } from "react-native";
import { Link } from "react-router-native";

const AppBarTab = ({ text, link, style }) => {
  let newStyle = { ...style, textAlign: "center" };
  const onPressFunction = () => {};
  return (
    <Pressable onPress={onPressFunction}>
      <Link to={link}>
        <Text style={newStyle}>{text}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
