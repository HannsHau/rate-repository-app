import { View, StyleSheet } from "react-native";
import Text from "./Text";
import { format, parseISO } from "date-fns";

const styles = StyleSheet.create({
  flexContainerRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexContainerColumnSmall: {
    flexGrow: 0,
    flexShrink: 1,
    display: "flex",
    padding: 10,
    minWidth: 40,
    maxWidth: "100%",
  },
  flexContainerColumn: {
    flexGrow: 1,
    flexShrink: 1,
    display: "flex",
    padding: 10,
    minWidth: 60,
    maxWidth: "100%",
  },
  flexContainerRating: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    border: "2px solid #0366d6",
  },
  Rating: {
    padding: 5,
    color: "#0366d6",
  },
  flexItemShort: {
    flexGrow: 0,
    padding: 5,
  },
  Item: {
    display: "flex",
    padding: 5,
  },
});

const ReviewItem = ({ review, titleIsUser}) => {
  const formattedDate = format(parseISO(review.createdAt), "dd.MM.yyyy");

  return (
    <View style={styles.flexContainerRow}>
      <View style={styles.flexContainerColumnSmall}>
        <View style={styles.flexContainerRating}>
          <Text fontWeight="bold" style={styles.Rating}>
            {review.rating}
          </Text>
        </View>
      </View>
      <View style={styles.flexContainerColumn}>
        <View style={styles.Item}>
          {titleIsUser ? (
            <Text fontWeight="bold">{review.user.username}</Text>
          ) : (
            <Text fontWeight="bold">{review.repository.fullName}</Text>
          )}
        </View>
        <View style={styles.Item}>
          <Text color="textSecondary">{formattedDate}</Text>
        </View>
        <View style={styles.Item}>
          <Text color="textPrimary">{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
