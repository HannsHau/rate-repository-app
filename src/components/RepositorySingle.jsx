import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { FlatList, View, StyleSheet } from "react-native";
import { format, parseISO } from "date-fns";
import Text from "./Text";

import useRepository from "../hooks/useRepository";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "lightgray",
  },
  flexContainer: {
    flexGrow: 0,
    display: "flex",
    padding: 5,
  },
  flexContainerRow: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
  },
  flexItemShort: {
    flexGrow: 0,
    padding: 5,
  },
  Item: {
    padding: 5,
    flex: 1, // Takes remaining space after rating
    flexDirection: "column", // Stack username/date/text vertically
  },
  Rating: {
    borderRadius: 25,
    padding: 10,
    border: "2px solid #0366d6",
    color: "#0366d6",
  },
  RatingText: {
    flex: 1,
    flexBasis: 0, // Key: Responsive base width (0 + flexGrow fills parent)
    flexShrink: 1,
    flexGrow: 1, // Grows to fill available space
    lineHeight: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  const formattedDate = format(parseISO(review.createdAt), "dd.MM.yyyy");

  console.log("Review: ", review);
  return (
    <View style={styles.flexContainerRow}>
      <View style={styles.flexItemShort}>
        <Text fontWeight="bold" style={styles.Rating}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.flexContainer}>
        <View style={styles.Item}>
          <Text fontWeight="bold">{review.user.username}</Text>
        </View>
        <View style={styles.Item}>
          <Text color="textSecondary">{formattedDate}</Text>
        </View>
        <View style={styles.Item}>
          <Text style={styles.RatingText}>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const RepositorySingle = () => {
  let params = useParams();
  const { repository } = useRepository(params.id);

  const reviewNodes = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem {...repository} details={true} />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositorySingle;
