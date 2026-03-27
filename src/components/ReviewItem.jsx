import { View, StyleSheet, Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import Text from "./Text";
import { format, parseISO } from "date-fns";
import useReview from "../hooks/useReview";

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
  button: {
    flexGrow: 0,
    padding: 10,
    margin: 10,
    color: "#f6f6f6",
    backgroundColor: "#0366d6",
    borderRadius: 5,
  },
});

const ReviewItem = ({ review, titleIsUser, refetch }) => {
  const navigate = useNavigate();
  const reviewHook = useReview();

  const formattedDate = format(parseISO(review.createdAt), "dd.MM.yyyy");

  const onPressView = (repositoryId, navigate) => {
    console.log("onPressFunction : ", repositoryId);
    navigate(`/repository/${repositoryId}`);
  };

  const onPressDelete = async (reviewId) => {
    console.log("TODO delete: onPressFunction : ", reviewId);
    Alert.alert("Delete review", "Are you sure you want to delete review?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          console.log("OK Pressed");
          await reviewHook.deleteReview(reviewId);
          await refetch();
        },
      },
    ]);
  };

  return (
    <View style={styles.flexContainerColumn}>
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
      {!titleIsUser && (
        <View style={styles.flexContainerRow}>
          <Pressable
            style={styles.button}
            onPress={() => onPressView(review.repositoryId, navigate)}
          >
            <Text
              color="textWhite"
              fontWeight="bold"
              style={{ textAlign: "center" }}
            >
              View repository
            </Text>
          </Pressable>
          <Pressable
            style={{ ...styles.button, backgroundColor: "#d73a4a" }}
            onPress={() => onPressDelete(review.id)}
          >
            <Text
              color="textWhite"
              fontWeight="bold"
              style={{ textAlign: "center" }}
            >
              Delete review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
