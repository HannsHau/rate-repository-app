import { Image, View, StyleSheet, Button } from "react-native";
import Stats from "./Stats";
import Text from "./Text";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5,
    margin: 10,
  },
  flexContainer: {
    display: "flex",
    padding: 5,
  },
  flexContainerRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexItem: {
    flexGrow: 1,
    paddingBottom: 5,
  },
  flexItemShort: {
    flexGrow: 0,
    padding: 5,
    color: "#f6f6f6",
    backgroundColor: "#0366d6",
    borderRadius: 5,
  },
});

const RepositoryItem = ({
  fullName,
  description,
  language,
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage,
  ownerAvatarUrl,
  url,
  details,
}) => {
  const onPress = () => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.flexContainer} testID="repositoryItem">
      <View style={styles.flexContainerRow}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: ownerAvatarUrl,
          }}
        />
        <View style={styles.flexContainer}>
          <View style={styles.flexItem}>
            <Text fontSize="subheading">{fullName}</Text>
          </View>
          <View style={styles.flexItem}>
            <Text>{description}</Text>
          </View>
          <View style={styles.flexContainerRow}>
            <View style={styles.flexItemShort}>
              <Text color="textWhite" fontWeight="bold" style={styles.flexItem}>
                {language}
              </Text>
            </View>
            <View style={styles.flexItem}></View>
          </View>
        </View>
      </View>
      <Stats
        stars={stargazersCount}
        forks={forksCount}
        review={reviewCount}
        rating={ratingAverage}
      />
      {details && (
        <View style={styles.flexContainer}>
          <Button
            onPress={onPress}
            title="Open in GitHub"
          />
        </View>
      )}
    </View>
  );
};

export default RepositoryItem;
