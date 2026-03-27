import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { FlatList, View, StyleSheet } from "react-native";
import ReviewItem from "./ReviewItem";

import useRepository from "../hooks/useRepository";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "lightgray",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositorySingle = () => {
  let params = useParams();

  const { repository, fetchMore } = useRepository({
    first: 3,
    id: params.id,
  });

  const reviewNodes = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const onEndReach = () => {
    console.log("fetch more.....")
    fetchMore();
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} titleIsUser={true} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem {...repository} details={true} />
          <ItemSeparator />
        </>
      )}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositorySingle;
