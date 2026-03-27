import ReviewItem from "./ReviewItem";
import useCurrentUser from "../hooks/useCurrentUser";
import Text from "./Text";

const MyReviews = () => {
  const { currentUser, loading, error } = useCurrentUser(true);

  if (error) return <Text>Error: {error}</Text>;
  if (loading) return <Text>loading ...</Text>;

  const reviews = currentUser
    ? currentUser.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <>
      {reviews.map((review) => (
        <ReviewItem review={review} titleIsUser={false} key={review.id}/>
      ))}
    </>
  );
};

export default MyReviews;
