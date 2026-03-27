import ReviewItem from "./ReviewItem";
import useCurrentUser from "../hooks/useCurrentUser";
import Text from "./Text";
import { StyleSheet, View, FlatList } from "react-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "lightgray",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { currentUser, loading, error, refetch } = useCurrentUser(true);

  if (error) return <Text>Error: {error}</Text>;
  if (loading) return <Text>loading ...</Text>;

  const reviews = currentUser
    ? currentUser.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <ReviewItem review={item} titleIsUser={false} refetch={refetch}/>
      )}
    />
  );
};

export default MyReviews;
