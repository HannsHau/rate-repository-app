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
  flexContainerRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexContainerColumn: {
    flexGrow: 1,
    flexShrink: 1,
    display: "flex",
    padding: 10,
    minWidth: 50,
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

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  const formattedDate = format(parseISO(review.createdAt), "dd.MM.yyyy");

  return (
    <View style={styles.flexContainerRow}>
      <View style={styles.flexContainerColumn}>
        <View style={styles.flexContainerRating}>
          <Text fontWeight="bold" style={styles.Rating}>
            {review.rating}
          </Text>
        </View>
      </View>
      <View style={styles.flexContainerColumn}>
        <View style={styles.Item}>
          <Text fontWeight="bold">{review.user.username}</Text>
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
        <>
          <RepositoryItem {...repository} details={true} />
          <ItemSeparator />
        </>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositorySingle;
