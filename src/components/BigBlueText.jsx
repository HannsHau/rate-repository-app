import { Text as TextOld, View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  text: {
    color: "grey",
    fontSize: 14,
  },
  blueText: {
    color: "blue",
  },
  bigText: {
    fontSize: 24,
    fontWeight: "700",
  },
});

const FancyText = ({ isBlue, isBig, children }) => {
  const textStyles = [
    styles.text,
    isBlue && styles.blueText,
    isBig && styles.bigText,
  ];

  return <TextOld style={textStyles}>{children}</TextOld>;
};

const FancyTextCollection = () => {
  return (
    <>
      <FancyText>Dicke Titten, Kartoffelsalat</FancyText>
      <FancyText isBlue>Blue text</FancyText>
      <FancyText isBig>Big text</FancyText>
      <FancyText isBig isBlue>
        Big blue text
      </FancyText>
      <Text>Simple text</Text>
      <Text style={{ paddingBottom: 20 }}>Text with custom style</Text>
      <Text fontWeight="bold" fontSize="subheading">
        Bold subheading
      </Text>
      <Text color="textSecondary">Text with secondary color</Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
    </>
  );
};

export default FancyTextCollection;
